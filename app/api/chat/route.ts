import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { restore } from '@orama/plugin-data-persistence';
import { search } from '@orama/orama';
import fs from 'fs';
import path from 'path';

// Load the index once into memory
const INDEX_PATH = path.join(process.cwd(), 'public', 'search-index.json');
let oramaDB: any = null;

async function getOramaDB() {
    if (oramaDB) return oramaDB;
    try {
        const data = fs.readFileSync(INDEX_PATH, 'utf-8');
        oramaDB = await restore('json', data);
        return oramaDB;
    } catch (e) {
        console.error("❌ Orama index not found. Did you run 'npm run build:index'?");
        return null;
    }
}

export async function POST(req: Request) {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Setup Memory (Reconstruct history from request)
    // Manually map messages to LangChain types
    const history = messages.slice(0, -1).map((m: any) =>
        m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
    );

    // 2. RAG Retrieval
    const db = await getOramaDB();
    let context = "";
    if (db) {
        const searchResult = await search(db, { term: lastMessage, limit: 3 });
        context = searchResult.hits
            .map((h) => `Source: ${h.document.title}\nContent: ${h.document.content}`)
            .join("\n---\n");
    }

    // 3. Prompt Template
    // 3. Prompt Template
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", `You are a helpful documentation assistant for "Vetradocs".
    Answer questions based on the provided documentation context.
    
    Context:
    {context}
    
    If the answer is not in the context, apologize and say you don't know based on the docs.`],
        new MessagesPlaceholder("history"),
        ["human", "{input}"],
    ]);

    // 4. LLM Setup (Generic OpenAI Compatible)
    const model = new ChatOpenAI({
        modelName: process.env.LLM_MODEL || "gpt-3.5-turbo",
        configuration: {
            baseURL: process.env.LLM_BASE_URL,
            apiKey: process.env.LLM_API_KEY,
        },
        streaming: true,
        temperature: 0,
    });

    // 5. Chain & Stream
    const chain = RunnableSequence.from([
        {
            input: (initialInput) => initialInput.input,
            context: (initialInput) => initialInput.context, // Pass context explicitly
            history: () => history,
        },
        prompt,
        model,
        new StringOutputParser(),
    ]);

    const stream = await chain.stream({
        input: lastMessage,
        context: context // Inject computed context here
    });

    // Convert LangChain stream to Web Response Stream
    const encoder = new TextEncoder();
    const transformStream = new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {
                controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
        },
    });

    return new Response(transformStream);
}
