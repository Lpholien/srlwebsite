import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const contentDir = path.join(rootDir, 'content', 'blog');
const distDir = path.join(rootDir, 'dist');
const blogOutputDir = path.join(distDir, 'blog');

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseFrontmatter(raw) {
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
  const metadata = {};

  for (const line of frontmatterBlock.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

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

function markdownPreview(markdown) {
  return markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/[*_`>|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

async function getSiteUrl() {
  const cnameFile = path.join(rootDir, 'CNAME');
  const cname = (await fs.readFile(cnameFile, 'utf8')).trim();
  const host = cname.replace(/^https?:\/\//, '');
  return `https://${host}`;
}

async function loadPosts() {
  const files = await fs.readdir(contentDir);
  const posts = [];

  for (const fileName of files) {
    if (!fileName.endsWith('.md')) continue;

    const filePath = path.join(contentDir, fileName);
    const raw = await fs.readFile(filePath, 'utf8');
    const { metadata, content } = parseFrontmatter(raw);
    const slug = fileName.replace(/\.md$/, '');

    posts.push({
      slug,
      title: metadata.title || 'Untitled',
      description: metadata.description || markdownPreview(content) || 'Blog article',
      date: metadata.date || new Date().toISOString().split('T')[0],
      coverImage: metadata.coverImage || '/logo.png',
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function renderPage(template, page) {
  let html = template;
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  html = replaceTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeHtml(page.url)}" />`);
  html = replaceTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = replaceTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = replaceTag(html, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${escapeHtml(page.ogType)}" />`);
  html = replaceTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escapeHtml(page.url)}" />`);
  html = replaceTag(html, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${escapeHtml(page.image)}" />`);
  html = replaceTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`);
  html = replaceTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);
  html = replaceTag(html, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${escapeHtml(page.image)}" />`);
  return html;
}

async function run() {
  const siteUrl = await getSiteUrl();
  const posts = await loadPosts();
  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');

  await fs.rm(blogOutputDir, { recursive: true, force: true });
  await fs.mkdir(blogOutputDir, { recursive: true });

  const blogDescription = 'Insights and perspectives on compliance, digital transformation, and Life Sciences operations.';
  const firstImage = posts[0]?.coverImage || '/logo.png';
  const firstImageUrl = firstImage.startsWith('http') ? firstImage : `${siteUrl}${firstImage}`;

  const urls = [siteUrl, `${siteUrl}/blog`];

  await writeFile(
    path.join(blogOutputDir, 'index.html'),
    renderPage(template, {
      title: 'Genval Lake Blog | Pharma 4.0 and Compliance Insights',
      description: blogDescription,
      url: `${siteUrl}/blog`,
      ogType: 'website',
      image: firstImageUrl,
    })
  );

  for (const post of posts) {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    urls.push(postUrl);
    const image = post.coverImage.startsWith('http') ? post.coverImage : `${siteUrl}${post.coverImage}`;

    await writeFile(
      path.join(blogOutputDir, post.slug, 'index.html'),
      renderPage(template, {
        title: `${post.title} | Genval Lake Blog`,
        description: post.description,
        url: postUrl,
        ogType: 'article',
        image,
      })
    );
  }

  await writeFile(
    path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}
</urlset>`
  );

  await writeFile(
    path.join(distDir, 'robots.txt'),
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`
  );
}

run().catch((error) => {
  console.error('Failed generating SEO pages:', error);
  process.exit(1);
});
