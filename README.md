# VectraDocs: AI-Powered Documentation Starter

[![npm version](https://img.shields.io/npm/v/vetradocs-vitepress.svg)](https://www.npmjs.com/package/vetradocs-vitepress)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast, modern documentation starter kit featuring a context-aware AI Assistant, similar to Mintlify, but open-source and self-hostable.

Built with **Next.js 16**, **Fumadocs**, **LangChain**, and **Orama**.

## 🚀 Features

- **🧠 Context-Aware AI Chat**: Queries your documentation to provide accurate, cited answers.
- **⚡ Client-Side RAG**: Powered by [Orama](https://askorama.ai/), enabling instant search without heavy server costs.
- **💬 Premium UI**:
  - **Floating Action Bar**: "Ask AI" button that stays out of your way until needed.
  - **Rich Markdown**: Renders code blocks, lists, and formatting perfectly.
  - **Code Copying**: One-click copy for AI-generated code snippets.
- **🔌 Pluggable LLMs**: Switch between OpenAI, Ollama (Local), Anthropic, etc. via LangChain.

## 📦 VitePress Plugin

Using VitePress instead? We have a plugin for that!

```bash
npm install vetradocs-vitepress
```

**[View on npm →](https://www.npmjs.com/package/vetradocs-vitepress)**

### Docusaurus Plugin

```bash
npm install vetradocs-docusaurus
```

**[View on npm →](https://www.npmjs.com/package/vetradocs-docusaurus)**

### Scalar / Generic (Web Component)

```bash
npm install vetradocs-scalar
```

**[View on npm →](https://www.npmjs.com/package/vetradocs-scalar)**

**[View on npm →](https://www.npmjs.com/package/vetradocs-vitepress)**

## 🛠️ Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Docs Engine**: [Fumadocs](https://fumadocs.dev/)
- **AI/LLM**: [LangChain.js](https://js.langchain.com/)
- **Vector Search**: [Orama](https://askorama.ai/)
- **Styling**: Tailwind CSS + Lucide React

## 📦 Getting Started

1. **Clone & Install**:

   ```bash
   git clone https://github.com/iotserver24/VectraDocs.git
   cd VectraDocs
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

## 🌟 Credits

Built by **[iotserver24](https://github.com/iotserver24)**

## 📄 License

MIT
