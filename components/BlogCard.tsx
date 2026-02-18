import React from 'react';
import { BlogPost } from '../types';
import { Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogCardProps {
    post: BlogPost;
    onReadMore: (slug: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article
            className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1"
            onClick={() => onReadMore(post.slug)}
        >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>

            <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden group-hover:border-cyan-400/20 transition-colors duration-500">
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                            <Tag size={10} />
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <span>{formattedDate}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                        {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1 line-clamp-3">
                        {post.description}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        Read Article
                        <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </article>
    );
};
