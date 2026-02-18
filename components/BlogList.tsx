import React, { useState, useMemo } from 'react';
import { BlogPost } from '../types';
import { BlogCard } from './BlogCard';
import { loadBlogPosts } from '../data/blogPosts';
import { BookOpen, Filter } from 'lucide-react';

interface BlogListProps {
    onSelectArticle: (slug: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onSelectArticle }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const blogPosts = useMemo(() => loadBlogPosts(), []);
    const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

    const filteredPosts = activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter(p => p.category === activeCategory);

    return (
        <section className="pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
                        <BookOpen size={14} />
                        Insights & Perspectives
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        The Genval Lake <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Blog</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Thought leadership at the intersection of pharmaceutical manufacturing,
                        regulatory compliance, and digital transformation.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-14">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/10'
                                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <BlogCard
                            key={post.slug}
                            post={post}
                            onReadMore={onSelectArticle}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <Filter size={40} className="text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500">No articles in this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
