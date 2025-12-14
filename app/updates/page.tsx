'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles, Package, Zap, Code2, Github, ExternalLink, Calendar, Tag, History } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const updates = [
    {
        version: '1.0.0',
        date: 'December 14, 2025',
        tag: 'Latest',
        tagColor: 'bg-orange-500/20 text-orange-400',
        title: 'Major Release 🚀',
        description: 'New framework plugins and backend support for VectraDocs.',
        features: [
            {
                icon: Package,
                title: 'Three Framework Plugins',
                description: 'VitePress, Docusaurus, and Scalar/Web Component support',
            },
            {
                icon: Zap,
                title: 'Backend CLI Tool',
                description: 'npx create-vetradocs-backend@latest for instant setup',
            },
            {
                icon: Code2,
                title: 'Premium UI',
                description: 'Dark mode, floating command bar, rich markdown rendering',
            },
            {
                icon: Sparkles,
                title: 'Enhanced AI Chat',
                description: 'Improved RAG with automatic documentation references',
            },
        ],
        packages: [
            { name: 'vetradocs-vitepress', version: '1.0.0', npm: 'https://www.npmjs.com/package/vetradocs-vitepress' },
            { name: 'vetradocs-docusaurus', version: '1.0.0', npm: 'https://www.npmjs.com/package/vetradocs-docusaurus' },
            { name: 'vetradocs-scalar', version: '1.0.0', npm: 'https://www.npmjs.com/package/vetradocs-scalar' },
            { name: 'create-vetradocs-backend', version: '0.0.5', npm: 'https://www.npmjs.com/package/create-vetradocs-backend' },
        ],
        highlights: [
            'New VitePress, Docusaurus, and Scalar plugins',
            'Backend CLI for quick project setup',
            'Automatic documentation references in AI responses',
            'Relative URLs that work on any domain',
            'Client-side vector search with Orama',
            'Streaming AI responses',
        ],
    },
    {
        version: '0.0.1',
        date: 'December 12, 2025',
        tag: 'Initial',
        tagColor: 'bg-zinc-800 text-zinc-400',
        title: 'First Release',
        description: 'The initial release of VectraDocs with core AI chat functionality.',
        features: [
            {
                icon: Sparkles,
                title: 'AI Chat with RAG',
                description: 'Context-aware AI assistant powered by Orama and LangChain',
            },
            {
                icon: History,
                title: 'Core Architecture',
                description: 'Initial implementation of the RAG pipeline',
            },
        ],
        packages: [],
        highlights: [
            'Basic AI Chat',
            'Markdown indexing',
            'One-click code copying',
        ],
    },
];

const roadmap = {
    comingSoon: [
        'Multi-language documentation support',
        'Custom AI personas',
        'Analytics dashboard',
        'Self-hosted vector database options',
    ],
    considering: [
        'VS Code extension',
        'Slack/Discord bot integration',
        'PDF documentation export',
        'Custom themes marketplace',
    ],
};

function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        // 1. Scroll Handler for Focus Effect and Line
        const handleScroll = () => {
            if (!ref.current) return;

            const windowHeight = window.innerHeight;
            const center = windowHeight / 2;

            // --- Line Animation ---
            const timeline = ref.current.querySelector('#timeline-container');
            if (timeline) {
                const rect = timeline.getBoundingClientRect();
                // Calculate line height so the tip is exactly at the center of the viewport
                // rect.top is position of timeline start relative to viewport top.
                // If rect.top is at center (windowHeight/2), length is 0.
                // As we scroll down, rect.top moves up (becomes negative).
                // Length = Center - rect.top
                const height = center - rect.top;
                const max = rect.height;
                setLineHeight(Math.max(0, Math.min(height, max)));
            }

            // --- Focus/Fade Effect ---
            const focusItems = ref.current.querySelectorAll('.focus-item');
            focusItems.forEach((item) => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;

                // Distance from center
                const dist = Math.abs(center - itemCenter);

                // Adjustable params
                // safeZone: Distance from center where item remains 100% visible (px)
                const safeZone = 150;
                // fadeRange: Distance after safeZone where it fades out completely (px)
                const fadeRange = windowHeight / 2.2;

                let opacity = 1;

                if (dist > safeZone) {
                    // Calculate drop-off
                    opacity = 1 - ((dist - safeZone) / fadeRange);
                }

                // Clamp limits (min 0.05 opacity)
                opacity = Math.max(0.05, Math.min(1, opacity));

                // Apply opacity
                (item as HTMLElement).style.opacity = opacity.toString();

                // Apply stronger blur at edges
                // If opacity is 1, blur is 0. If opacity is near 0, blur is higher.
                const blur = (1 - opacity) * 8;
                (item as HTMLElement).style.filter = `blur(${blur}px)`;

                // Scale effect
                const scale = 0.9 + (0.1 * opacity);
                (item as HTMLElement).style.transform = `scale(${scale})`;
            });

            // --- Leader Dot Shine Effect (when near version header) ---
            const leaderDot = ref.current.querySelector('#leader-dot');
            const versionHeaders = ref.current.querySelectorAll('.version-header');
            let isNearVersion = false;

            versionHeaders.forEach((header) => {
                const rect = header.getBoundingClientRect();
                const headerCenter = rect.top + rect.height / 2;
                const dist = Math.abs(center - headerCenter);

                // If leader is within 100px of a version header, shine bright
                if (dist < 100) {
                    isNearVersion = true;
                }
            });

            if (leaderDot) {
                if (isNearVersion) {
                    leaderDot.classList.add('leader-bright');
                } else {
                    leaderDot.classList.remove('leader-bright');
                }
            }

        };

        // Use requestAnimationFrame for smoother scroll handling
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return { ref, lineHeight };
}

export default function UpdatesPage() {
    const { ref, lineHeight } = useScrollAnimation();

    return (
        <div ref={ref} className="min-h-[150vh] bg-black text-zinc-100 pb-32">
            <style jsx global>{`
        .focus-item {
          transition: opacity 0.1s linear, transform 0.1s linear, filter 0.1s linear;
          will-change: opacity, transform, filter;
        }
        
        .timeline-line-active {
          transition: height 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        #leader-dot {
          transition: all 0.3s ease-out;
        }
        
        .leader-bright {
          width: 20px !important;
          height: 20px !important;
          box-shadow: 0 0 40px rgba(249, 115, 22, 1), 0 0 80px rgba(249, 115, 22, 0.6) !important;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(249, 115, 22, 0.4); transform: translate(-50%, 50%) scale(1); }
          50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.7); transform: translate(-50%, 50%) scale(1.2); }
        }
        
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-flow 3s ease infinite;
        }
      `}</style>

            {/* Header */}
            <div className="w-full border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
                <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                        Updates
                    </h1>
                    <Link
                        href="/docs"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-500 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Docs
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 pt-12 text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent gradient-animate mb-6">
                    Changelog
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    A history of VectraDocs features and improvements.
                </p>
            </div>

            {/* Timeline */}
            <div id="timeline-container" className="max-w-3xl mx-auto px-4 relative">

                {/* Continuous Timeline Background Line */}
                <div className="absolute left-[29px] md:left-8 top-0 bottom-0 w-px bg-zinc-800 z-0" />

                {/* Active Progress Line */}
                <div
                    className="absolute left-[29px] md:left-8 top-0 w-px bg-gradient-to-b from-orange-500 to-orange-400 z-10 timeline-line-active"
                    style={{ height: `${lineHeight}px` }}
                >
                    {/* Glowing Leader Dot */}
                    <div
                        id="leader-dot"
                        className="absolute bottom-0 left-1/2 w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,1)] -translate-x-1/2 translate-y-1/2"
                    />
                </div>

                {updates.map((update, index) => (
                    <div key={update.version} className="relative z-20 mb-48 last:mb-0">
                        {/* Version Card */}
                        <div className="relative pl-16 pt-2">

                            {/* Version Header */}
                            <div className="version-header focus-item flex flex-wrap items-center gap-3 mb-6">
                                <span className="text-3xl font-bold text-white tracking-tight">v{update.version}</span>
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${update.tagColor}`}>
                                    {update.tag}
                                </span>
                                <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                                    <Calendar className="w-4 h-4" />
                                    {update.date}
                                </span>
                            </div>

                            <div className="focus-item mb-8">
                                <h2 className="text-xl font-semibold text-zinc-100 mb-2">{update.title}</h2>
                                <p className="text-zinc-400 text-lg">{update.description}</p>
                            </div>

                            {/* Features Grid */}
                            {update.features.length > 0 && (
                                <div className="focus-item grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {update.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                                    <feature.icon className="w-5 h-5 text-orange-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-zinc-100 mb-1">{feature.title}</h3>
                                                    <p className="text-sm text-zinc-400">{feature.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Highlights */}
                            {update.highlights.length > 0 && (
                                <div className="focus-item mb-8 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                                    <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-orange-500" />
                                        Highlights
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                                        {update.highlights.map((highlight, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Packages */}
                            {update.packages.length > 0 && (
                                <div className="focus-item">
                                    <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-orange-500" />
                                        Packages
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {update.packages.map((pkg, i) => (
                                            <a
                                                key={i}
                                                href={pkg.npm}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm hover:border-orange-500/50 hover:bg-zinc-800 transition-colors group"
                                            >
                                                <span className="text-zinc-300 group-hover:text-white transition-colors">{pkg.name}</span>
                                                <span className="text-zinc-600">@{pkg.version}</span>
                                                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-orange-500 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Roadmap */}
            <div className="border-t border-zinc-800 mt-20">
                <div className="max-w-3xl mx-auto px-4 py-16">
                    <h2 className="focus-item text-2xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
                        <Tag className="w-6 h-6 text-orange-500" />
                        Roadmap
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="focus-item p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                            <h3 className="font-semibold text-orange-400 mb-4 flex items-center gap-2">
                                🔜 Coming Soon
                            </h3>
                            <ul className="space-y-3">
                                {roadmap.comingSoon.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                                        <span className="w-2 h-2 rounded-full bg-orange-500/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="focus-item p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                            <h3 className="font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                💡 Under Consideration
                            </h3>
                            <ul className="space-y-3">
                                {roadmap.considering.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-400">
                                        <span className="w-2 h-2 rounded-full bg-zinc-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
