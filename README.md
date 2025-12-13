# Vetradocs: AI-Powered Documentation Starter

A fast, modern documentation starter kit featuring a context-aware AI Assistant, similar to Mintlify, but open-source and self-hostable.

Built with **Next.js 15**, **Fumadocs**, **LangChain**, and **Orama**.

## 🚀 Features

- **🧠 Context-Aware AI Chat**: Queries your documentation to provide accurate, cited answers.
- **⚡ Client-Side RAG**: Powered by [Orama](https://askorama.ai/), enabling instant search without heavy server costs.
- **💬 Premium UI**:
  - **Floating Action Bar**: "Ask AI" button that stays out of your way until needed.
  - **Rich Markdown**: Renders code blocks, lists, and formatting perfectly.
  - **Code Copying**: One-click copy for AI-generated code snippets.
- **🔌 Pluggable LLMs**: Switch between OpenAI, Ollama (Local), Anthropic, etc. via LangChain.

## 🛠️ Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Docs Engine**: [Fumadocs](https://fumadocs.dev/)
- **AI/LLM**: [LangChain.js](https://js.langchain.com/)
- **Vector Search**: [Orama](https://askorama.ai/)
- **Styling**: Tailwind CSS + Lucide React

## 📦 Getting Started

1. **Clone & Install**:

   ```bash
   git clone https://github.com/iotserver24/vetradocs.git
   cd vetradocs
   npm install
   ```

2. **Configure Secrets**:
   Create `.env.local`:

   ```env
   LLM_BASE_URL="https://api.openai.com/v1"
   LLM_API_KEY="sk-..."
   LLM_MODEL="gpt-3.5-turbo"
   ```

3. **Build Index & Run**:

   ```bash
   npm run build:index
   npm run dev
   ```

4. **Visit**: `http://localhost:3000`

## 📖 Documentation

Detailed documentation is available inside the app itself! Just run it and navigate to the docs, or ask the AI "How do I use this?".

## 📄 License

MIT
