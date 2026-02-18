import { BlogPost } from '../types';

/**
 * Parse YAML-style frontmatter from a markdown string.
 * Returns { metadata, content } where metadata is the parsed frontmatter
 * and content is the markdown body after the closing ---.
 */
function parseFrontmatter(raw: string): { metadata: Record<string, any>; content: string } {
    const trimmed = raw.trim();
    if (!trimmed.startsWith('---')) {
        return { metadata: {}, content: trimmed };
    }

    const closingIndex = trimmed.indexOf('---', 3);
    if (closingIndex === -1) {
        return { metadata: {}, content: trimmed };
    }

    const frontmatterBlock = trimmed.slice(3, closingIndex).trim();
    const content = trimmed.slice(closingIndex + 3).trim();

    const metadata: Record<string, any> = {};
    for (const line of frontmatterBlock.split('\n')) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Remove surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Parse arrays: ["tag1", "tag2"]
        if (value.startsWith('[') && value.endsWith(']')) {
            try {
                metadata[key] = JSON.parse(value);
            } catch {
                metadata[key] = value;
            }
        } else {
            metadata[key] = value;
        }
    }

    return { metadata, content };
}

/**
 * Load all blog posts from markdown files in /content/blog/.
 * Uses Vite's import.meta.glob to discover files at build time.
 * Each .md file should have YAML frontmatter with:
 *   title, description, author, date, readTime, category, tags, coverImage
 * The slug is derived from the filename (e.g., my-article.md → my-article).
 */
export function loadBlogPosts(): BlogPost[] {
    // Vite glob import — loads all .md files as raw strings at build time
    const modules = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

    const posts: BlogPost[] = [];

    for (const [path, raw] of Object.entries(modules)) {
        const { metadata, content } = parseFrontmatter(raw as string);

        // Derive slug from filename: /content/blog/my-article.md → my-article
        const filename = path.split('/').pop() || '';
        const slug = filename.replace(/\.md$/, '');

        posts.push({
            slug,
            title: metadata.title || 'Untitled',
            description: metadata.description || '',
            author: metadata.author || 'Genval Lake Consulting',
            date: metadata.date || new Date().toISOString().split('T')[0],
            readTime: metadata.readTime || '5 min read',
            category: metadata.category || 'General',
            tags: Array.isArray(metadata.tags) ? metadata.tags : [],
            coverImage: metadata.coverImage || '',
            content,
        });
    }

    // Sort by date descending (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}
