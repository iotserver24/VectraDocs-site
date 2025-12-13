🚀 Project: "Vetradocs" (Open Source RAG Docs)Description: This guide contains every file and instruction needed to build a documentation platform with the UI of Mintlify (via Fumadocs) and a completely free, private, client-side RAG AI (via LangChain.js + Orama).Tech Stack:UI: Next.js + FumadocsAI Logic: LangChain.jsSearch/RAG: Orama (Runs in browser/memory, $0 cost)LLM: Custom Endpoint (Ollama, vLLM, or OpenAI)🏗️ Phase 1: Setup & Dependencies1. Initialize ProjectIf you haven't already, create a Fumadocs project:npm create fumadocs-app@latest
2. Install AI DependenciesRun this command in your project root:npm install langchain @langchain/openai @langchain/core @orama/orama lucide-react clsx tailwind-merge
3. Environment VariablesCreate a file named .env.local in your root directory:# File: .env.local

# 1. For Self-Hosted Ollama (Local)

LLM_BASE_URL="<http://localhost:11434/v1>"
LLM_API_KEY="ollama" # Ollama usually ignores this, but LangChain needs a string
LLM_MODEL="llama3"

# 2. OR For OpenAI / Compatible Proxies

# LLM_BASE_URL="[https://api.openai.com/v1](https://api.openai.com/v1)"

# LLM_API_KEY="sk-proj-..."

# LLM_MODEL="gpt-4o"

🧠 Phase 2: The RAG Engine (Zero-Cost Indexing)We need a script to scan your docs and create a searchable index file (orama-index.json).Create this file at: scripts/build-index.mjs// File: scripts/build-index.mjs
import { create, insert, save } from '@orama/orama';
import fs from 'fs';
import path from 'path';

// NOTE: In a real Fumadocs app, you would import 'getSource' from your lib/source
// to get real data. For this example, we mock the docs structure.
const MOCK_DOCS = [
  {
    title: "Introduction",
    url: "/docs",
    content: "Welcome to the Vetradocs docs. This project uses LangChain and Orama."
  },
  {
    title: "Installation",
    url: "/docs/installation",
    content: "To install, run npm install. Then configure your .env.local file with LLM settings."
  },
  {
    title: "Architecture",
    url: "/docs/architecture",
    content: "We use Orama for client-side RAG. It allows searching documentation without a vector database."
  }
];

const OUTPUT_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'search-index.json');

async function build() {
  console.log('🏗️  Building Orama Search Index...');

  // 1. Create the Orama Database Schema
  const db = await create({
    schema: {
      title: 'string',
      url: 'string',
      content: 'string',
    },
  });

  // 2. Insert Documents (Replace MOCK_DOCS with your actual page loop)
  // const pages = getSource().getPages();
  const pages = MOCK_DOCS;

  for (const page of pages) {
    await insert(db, {
      title: page.title, // or page.data.title
      url: page.url,
      content: page.content, // or page.data.body.raw
    });
  }

  // 3. Save Index to Public Folder (so the browser/API can load it)
  const index = await save(db);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index));

  console.log(`✅ Index saved to ${OUTPUT_FILE}`);
}

build();
Add this to package.json scripts:"scripts": {
  "build:index": "node scripts/build-index.mjs",
  "build": "npm run build:index && next build"
}
🤖 Phase 3: The AI Backend (LangChain Route)This handles the conversation memory, RAG retrieval, and streaming.Create this file at: app/api/chat/route.ts// File: app/api/chat/route.ts
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { restore, search } from '@orama/orama';
import fs from 'fs';
import path from 'path';

// Load the index once into memory
const INDEX_PATH = path.join(process.cwd(), 'public', 'search-index.json');
let oramaDB: any = null;

async function getOramaDB() {
  if (oramaDB) return oramaDB;
  try {
    const data = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
    oramaDB = await restore(data);
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
  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  });

  for (const msg of messages.slice(0, -1)) {
    if (msg.role === 'user') await memory.chatHistory.addUserMessage(msg.content);
    else if (msg.role === 'assistant') await memory.chatHistory.addAIChatMessage(msg.content);
  }

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
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a helpful documentation assistant.
    Strictly answer based on the following context:

    ${context}
    
    If the answer is not in the context, say "I don't know".`],
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
      memory: () => memory.loadMemoryVariables({}),
    },
    {
      input: (previousOutput) => previousOutput.input,
      history: (previousOutput) => previousOutput.memory.history,
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const stream = await chain.stream({ input: lastMessage });

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
🎨 Phase 4: The Frontend UI (Chat Widget)A beautiful floating chat button that opens a dialog, mimicking Mintlify.Create this file at: components/ai-chat.tsx// File: components/ai-chat.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, MessageSquare } from "lucide-react";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.body) throw new Error("No response body");

      // Set up streaming reader
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiMsg = { role: "assistant", content: "" };
      
      setMessages((prev) => [...prev, aiMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        aiMsg.content += chunk;
        
        // Update the last message in state with the new chunk
        setMessages((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { ...aiMsg };
          return newHistory;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/*1. Floating Trigger Button*/}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-105"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* 2. Chat Window Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col h-[600px]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">AI Docs Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-zinc-500 mt-20">
                  <p>👋 Hi! Ask me anything about the documentation.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    m.role === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-zinc-400 animate-pulse">Thinking...</div>}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 p-2 bg-white dark:bg-zinc-950 border dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !input}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
🚀 Phase 5: Final IntegrationOpen your app/layout.tsx (or your main layout file) and add the component:import { AIChat } from "@/components/ai-chat";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <AIChat /> {/*<-- Add the Chat Widget here*/}
      </body>
    </html>
  );
}
✅ How to RunBuild the Search Index: npm run build:indexStart Dev Server: npm run devChat: Click the floating button and talk to your docs.
