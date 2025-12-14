import Link from 'next/link';
import { ArrowRight, Bot, Zap, Code2, Github, Terminal, Cpu, Globe, Package, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden bg-black text-zinc-100">

      {/* 1. Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center z-10">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Badge: Credits */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <Terminal className="w-3 h-3 text-orange-500" />
          <span>Built by <strong className="text-zinc-200">iotserver24</strong></span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Documentation that <br />
          <span className="text-orange-500">Chats Back.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The open-source, AI-first documentation starter.
          <span className="hidden md:inline"> Built with Next.js 16, Orama, and LangChain. </span>
          Replace generic search with an intelligent, context-aware assistant.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/docs"
            className="flex items-center gap-2 px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-orange-600/20"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/iotserver24/VectraDocs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-full font-medium transition-all"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>
      </div>

      {/* 2. Features Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-orange-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Context-Aware AI</h3>
            <p className="text-zinc-400 leading-relaxed">
              An intelligent assistant that knows your docs inside out. It answers questions instantly using RAG technology.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-orange-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Client-Side Speed</h3>
            <p className="text-zinc-400 leading-relaxed">
              Powered by <span className="text-zinc-200 font-medium">Orama</span>. Search indexing happens at build time and runs entirely in the browser. Zero latency.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-orange-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Premium UI & DX</h3>
            <p className="text-zinc-400 leading-relaxed">
              Built on Next.js 16. Features a sleek dark mode, floating command bars, and rich markdown rendering out of the box.
            </p>
          </div>

        </div>
      </div>

      {/* 3. VitePress Plugin Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-zinc-100 mb-2 flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-5 h-5 text-purple-400" />
              VitePress Plugin Available!
            </h3>
            <p className="text-zinc-400 mb-4">
              Using VitePress? Install our plugin and add AI chat to your docs in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <code className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-orange-400 font-mono">
                npm install vetradocs-vitepress
              </code>
              <a
                href="https://www.npmjs.com/package/vetradocs-vitepress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-400 hover:text-purple-300 underline"
              >
                View on npm →
              </a>
              <a
                href="https://github.com/iotserver24/vetradocs-vitepress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 hover:text-zinc-300 underline"
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Updates Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-zinc-100 mb-1">📋 Updates & Changelog</h3>
            <p className="text-sm text-zinc-400">Stay up to date with the latest features and improvements.</p>
          </div>
          <Link
            href="/updates"
            className="flex items-center gap-2 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-full text-sm font-medium transition-all"
          >
            View Changelog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 5. Tech Stack Marquee */}
      <div className="w-full border-t border-zinc-900 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="flex items-center gap-2 text-lg font-semibold"><Cpu className="w-5 h-5" /> Next.js 16</span>
          <span className="flex items-center gap-2 text-lg font-semibold"><Globe className="w-5 h-5" /> Fumadocs</span>
          <span className="flex items-center gap-2 text-lg font-semibold"><Bot className="w-5 h-5" /> LangChain</span>
          <span className="flex items-center gap-2 text-lg font-semibold"><Zap className="w-5 h-5" /> Orama</span>
        </div>
      </div>

    </div>
  );
}

