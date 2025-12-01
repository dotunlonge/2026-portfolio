// SEO utilities for SSR (CommonJS for serverless functions)

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

function generateStructuredData(data) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': data.type === 'article' ? 'BlogPosting' : 'Person',
    name: data.title || 'Oludotun Longe',
    description: data.description,
    url: data.url || 'https://dotunlonge.vercel.app',
  }

  if (data.type === 'article') {
    return `<script type="application/ld+json">${JSON.stringify({
      ...baseSchema,
      '@type': 'BlogPosting',
      headline: data.title,
      datePublished: data.publishedTime,
      dateModified: data.modifiedTime || data.publishedTime,
      author: {
        '@type': 'Person',
        name: data.author || 'Oludotun Longe',
      },
    })}</script>`
  }

  return `<script type="application/ld+json">${JSON.stringify({
    ...baseSchema,
    '@type': 'Person',
    jobTitle: 'Senior Software Engineer',
    knowsAbout: ['TypeScript', 'Rust', 'AI/LLMs', 'Web3', 'Full Stack Development'],
  })}</script>`
}

function generateMetaTags(data) {
  const {
    title = 'Oludotun Longe - Senior Software Engineer',
    description = 'Senior Software Engineer with 8+ years experience building high-performance systems, full-stack applications, and AI/Web3 products.',
    image = 'https://dotunlonge.vercel.app/og-image.jpg',
    url = 'https://dotunlonge.vercel.app',
    type = 'website',
    author = 'Oludotun Longe',
    publishedTime,
    modifiedTime,
    tags = [],
  } = data

  const metaTags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="author" content="${escapeHtml(author)}">`,
    ...tags.map(tag => `<meta name="keywords" content="${escapeHtml(tag)}">`),
    
    // Open Graph
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    `<meta property="og:image" content="${escapeHtml(image)}">`,
    `<meta property="og:site_name" content="Oludotun Longe Portfolio">`,
    
    // Twitter Card
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(image)}">`,
    
    // Article meta (for blog posts)
    ...(type === 'article' ? [
      publishedTime ? `<meta property="article:published_time" content="${publishedTime}">` : '',
      modifiedTime ? `<meta property="article:modified_time" content="${modifiedTime}">` : '',
      ...tags.map(tag => `<meta property="article:tag" content="${escapeHtml(tag)}">`),
    ].filter(Boolean) : []),
    
    // Canonical URL
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    
    // Structured Data (JSON-LD)
    generateStructuredData(data),
  ].filter(Boolean).join('\n  ')

  return metaTags
}

module.exports = { generateMetaTags, escapeHtml, generateStructuredData }

