import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

                    {/* Column 1: Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold text-white mb-3">VectraDocs</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            AI-powered documentation that chats back. Open source & free.
                        </p>
                    </div>

                    {/* Column 2: Documentation */}
                    <div>
                        <h4 className="text-sm font-semibold text-zinc-200 mb-3">Documentation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/docs" className="text-zinc-400 hover:text-orange-500 transition-colors">Introduction</Link></li>
                            <li><Link href="/docs/installation" className="text-zinc-400 hover:text-orange-500 transition-colors">Installation</Link></li>
                            <li><Link href="/docs/backend-setup" className="text-zinc-400 hover:text-orange-500 transition-colors">Backend Setup</Link></li>
                            <li><Link href="/docs/ai-configuration" className="text-zinc-400 hover:text-orange-500 transition-colors">AI Configuration</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Plugins */}
                    <div>
                        <h4 className="text-sm font-semibold text-zinc-200 mb-3">Plugins</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/docs/vitepress-plugin" className="text-zinc-400 hover:text-orange-500 transition-colors">VitePress</Link></li>
                            <li><Link href="/docs/docusaurus-plugin" className="text-zinc-400 hover:text-orange-500 transition-colors">Docusaurus</Link></li>
                            <li><Link href="/docs/scalar-plugin" className="text-zinc-400 hover:text-orange-500 transition-colors">Scalar / Web</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Community */}
                    <div>
                        <h4 className="text-sm font-semibold text-zinc-200 mb-3">Community</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://github.com/iotserver24/VectraDocs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-1.5"
                                >
                                    <Github className="w-3.5 h-3.5" /> GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.npmjs.com/package/vetradocs-vitepress"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-orange-500 transition-colors"
                                >
                                    npm Registry
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/iotserver24/VectraDocs-Backend"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-orange-500 transition-colors"
                                >
                                    Backend CLI
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                        © {new Date().getFullYear()} VectraDocs. MIT License.
                    </p>
                    <p className="text-xs text-zinc-500">
                        Built by <a href="https://github.com/iotserver24" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-500">iotserver24</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
