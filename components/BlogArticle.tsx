import React, { useEffect, useMemo } from 'react';
import { BlogPost } from '../types';
import { loadBlogPosts } from '../data/blogPosts';
import { ArrowLeft, Clock, Calendar, User, Linkedin, Link2, Tag, ChevronRight } from 'lucide-react';

interface BlogArticleProps {
    slug: string;
    onBack: () => void;
    onSelectArticle: (slug: string) => void;
}

// Simple Markdown-to-JSX renderer (no external dependency)
const renderMarkdown = (content: string): React.ReactNode[] => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];
    let inBlockquote = false;
    let blockquoteLines: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`list-${elements.length}`} className="space-y-2 mb-6 ml-1">
                    {listItems}
                </ul>
            );
            listItems = [];
            inList = false;
        }
    };

    const flushTable = () => {
        if (tableRows.length > 0) {
            elements.push(
                <div key={`table-${elements.length}`} className="overflow-x-auto mb-8 rounded-xl border border-slate-800">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-900/80">
                                {tableHeaders.map((h, i) => (
                                    <th key={i} className="px-4 py-3 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800">
                                        {h.trim()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, ri) => (
                                <tr key={ri} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-900/30">
                                    {row.map((cell, ci) => (
                                        <td key={ci} className="px-4 py-3 text-slate-300">
                                            {renderInline(cell.trim())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            tableRows = [];
            tableHeaders = [];
            inTable = false;
        }
    };

    const flushBlockquote = () => {
        if (blockquoteLines.length > 0) {
            elements.push(
                <blockquote
                    key={`bq-${elements.length}`}
                    className="border-l-4 border-cyan-500/50 bg-cyan-500/5 pl-6 pr-4 py-4 mb-6 rounded-r-lg italic text-slate-300"
                >
                    {blockquoteLines.map((l, i) => (
                        <p key={i}>{renderInline(l)}</p>
                    ))}
                </blockquote>
            );
            blockquoteLines = [];
            inBlockquote = false;
        }
    };

    const renderInline = (text: string): React.ReactNode => {
        // Bold
        const parts = text.split(/\*\*(.*?)\*\*/g);
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return <strong key={i} className="text-white font-semibold">{part}</strong>;
            }
            // Inline code
            const codeParts = part.split(/`(.*?)`/g);
            return codeParts.map((cp, j) => {
                if (j % 2 === 1) {
                    return <code key={`${i}-${j}`} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-sm font-mono">{cp}</code>;
                }
                // Links
                const linkParts = cp.split(/\[(.*?)\]\((.*?)\)/g);
                if (linkParts.length > 1) {
                    const nodes: React.ReactNode[] = [];
                    for (let k = 0; k < linkParts.length; k++) {
                        if (k % 3 === 1) {
                            nodes.push(
                                <a key={`${i}-${j}-${k}`} href={linkParts[k + 1]} className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300 transition-colors">
                                    {linkParts[k]}
                                </a>
                            );
                        } else if (k % 3 === 0) {
                            nodes.push(linkParts[k]);
                        }
                    }
                    return nodes;
                }
                return cp;
            });
        });
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Blockquote
        if (line.startsWith('> ')) {
            flushList();
            flushTable();
            inBlockquote = true;
            blockquoteLines.push(line.substring(2));
            continue;
        } else if (inBlockquote) {
            flushBlockquote();
        }

        // Table
        if (line.includes('|') && line.trim().startsWith('|')) {
            flushList();
            const cells = line.split('|').filter(c => c.trim() !== '');
            // Check if separator row
            if (cells.every(c => c.trim().match(/^-+$/))) {
                continue; // skip separator
            }
            if (!inTable) {
                inTable = true;
                tableHeaders = cells;
            } else {
                tableRows.push(cells);
            }
            continue;
        } else if (inTable) {
            flushTable();
        }

        // Horizontal rule
        if (line.trim() === '---') {
            flushList();
            elements.push(<hr key={`hr-${i}`} className="border-slate-800 my-10" />);
            continue;
        }

        // Empty line
        if (line.trim() === '') {
            flushList();
            continue;
        }

        // Headings
        if (line.startsWith('### ')) {
            flushList();
            elements.push(
                <h3 key={`h3-${i}`} className="text-xl font-bold text-white mt-10 mb-4 flex items-center gap-2">
                    <ChevronRight size={16} className="text-cyan-500" />
                    {renderInline(line.substring(4))}
                </h3>
            );
            continue;
        }
        if (line.startsWith('## ')) {
            flushList();
            elements.push(
                <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 pb-3 border-b border-slate-800">
                    {renderInline(line.substring(3))}
                </h2>
            );
            continue;
        }

        // List items
        if (line.match(/^[-*] /)) {
            inList = true;
            listItems.push(
                <li key={`li-${i}`} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 shrink-0"></span>
                    <span>{renderInline(line.substring(2))}</span>
                </li>
            );
            continue;
        }

        // Numbered list
        if (line.match(/^\d+\.\s/)) {
            const match = line.match(/^(\d+)\.\s(.*)/);
            if (match) {
                inList = true;
                listItems.push(
                    <li key={`li-${i}`} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0 mt-0.5">
                            {match[1]}
                        </span>
                        <span>{renderInline(match[2])}</span>
                    </li>
                );
            }
            continue;
        }

        // Italics paragraph (e.g., CTA at the end)
        if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
            flushList();
            elements.push(
                <p key={`em-${i}`} className="text-slate-400 italic text-sm mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    {renderInline(line.slice(1, -1))}
                </p>
            );
            continue;
        }

        // Regular paragraph
        flushList();
        elements.push(
            <p key={`p-${i}`} className="text-slate-300 leading-relaxed mb-5">
                {renderInline(line)}
            </p>
        );
    }

    flushList();
    flushTable();
    flushBlockquote();

    return elements;
};


export const BlogArticle: React.FC<BlogArticleProps> = ({ slug, onBack, onSelectArticle }) => {
    const blogPosts = useMemo(() => loadBlogPosts(), []);
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (post) {
            document.title = `${post.title} | Genval Lake Blog`;
            // Update OG tags dynamically
            const setMeta = (property: string, content: string) => {
                let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
                if (!tag) {
                    tag = document.createElement('meta');
                    tag.setAttribute('property', property);
                    document.head.appendChild(tag);
                }
                tag.content = content;
            };
            setMeta('og:title', post.title);
            setMeta('og:description', post.description);
            setMeta('og:image', post.coverImage);
            setMeta('og:url', window.location.href);
            setMeta('og:type', 'article');
        }
        return () => {
            document.title = 'Genval Lake Consulting | Pharma 4.0';
        };
    }, [post]);

    if (!post) {
        return (
            <div className="pt-32 pb-24 px-6 text-center min-h-screen">
                <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
                <p className="text-slate-400 mb-8">The article you're looking for doesn't exist.</p>
                <button onClick={onBack} className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    ← Back to Blog
                </button>
            </div>
        );
    }

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const shareUrl = encodeURIComponent(window.location.href);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

    const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <article className="pt-24 pb-24 min-h-screen">
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-6 mb-8">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </button>
            </div>

            {/* Hero */}
            <header className="relative mb-12">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Category */}
                    <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            <Tag size={10} />
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
                        {post.title}
                    </h1>

                    {/* Meta Row */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8">
                        <span className="flex items-center gap-2">
                            <User size={14} className="text-cyan-500" />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar size={14} className="text-cyan-500" />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={14} className="text-cyan-500" />
                            {post.readTime}
                        </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-slate-900 border border-slate-800 text-slate-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cover Image */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-6">
                <div className="prose-custom">
                    {renderMarkdown(post.content)}
                </div>
            </div>

            {/* Share Bar */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
                <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-white">Share this article</span>
                    <div className="flex gap-3">
                        <a
                            href={linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-semibold transition-colors"
                        >
                            <Linkedin size={16} />
                            Share on LinkedIn
                        </a>
                        <button
                            onClick={copyLink}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold transition-colors border border-slate-700"
                        >
                            <Link2 size={16} />
                            Copy Link
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 mt-20">
                    <h2 className="text-2xl font-bold text-white mb-8">More from the Blog</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {relatedPosts.map(rp => (
                            <div
                                key={rp.slug}
                                onClick={() => onSelectArticle(rp.slug)}
                                className="glass-panel rounded-2xl p-6 cursor-pointer group hover:border-cyan-400/20 transition-all duration-300"
                            >
                                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">{rp.category}</span>
                                <h3 className="text-lg font-bold text-white mt-2 mb-2 group-hover:text-cyan-400 transition-colors">
                                    {rp.title}
                                </h3>
                                <p className="text-sm text-slate-400 line-clamp-2">{rp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
};
