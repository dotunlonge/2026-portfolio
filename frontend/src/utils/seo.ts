// SEO utility functions for generating meta tags

export interface SEOData {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

/**
 * Generates a complete set of HTML meta tags for SEO optimization.
 * 
 * Creates meta tags for:
 * - Basic SEO (title, description, author, keywords)
 * - Open Graph (for social media sharing)
 * - Twitter Cards
 * - Article metadata (if type is 'article')
 * - Canonical URLs
 * - Structured data (JSON-LD)
 * 
 * @param {SEOData} data - SEO configuration object
 * @param {string} [data.title] - Page title
 * @param {string} [data.description] - Meta description
 * @param {string} [data.image] - Open Graph image URL
 * @param {string} [data.url] - Canonical URL
 * @param {string} [data.type] - Content type ('website' or 'article')
 * @param {string} [data.author] - Author name
 * @param {string} [data.publishedTime] - ISO date string for publication
 * @param {string} [data.modifiedTime] - ISO date string for modification
 * @param {string[]} [data.tags] - Array of keyword tags
 * 
 * @returns {string} HTML string containing all meta tags
 * 
 * @example
 * ```typescript
 * const metaTags = generateMetaTags({
 *   title: 'My Blog Post',
 *   description: 'A great article',
 *   type: 'article',
 *   tags: ['tech', 'programming']
 * })
 * ```
 */
export function generateMetaTags(data: SEOData): string {
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

/**
 * Escapes HTML special characters to prevent XSS attacks and ensure valid HTML.
 * 
 * Converts potentially dangerous characters to their HTML entity equivalents:
 * - & → &amp;
 * - < → &lt;
 * - > → &gt;
 * - " → &quot;
 * - ' → &#039;
 * 
 * @param {string} text - The text to escape
 * @returns {string} The escaped text safe for use in HTML attributes
 * 
 * @example
 * ```typescript
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 * ```
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Generates JSON-LD structured data script tag for search engines.
 * 
 * Creates structured data following Schema.org vocabulary:
 * - BlogPosting schema for articles
 * - Person schema for personal pages
 * 
 * This helps search engines understand the content structure and can improve
 * search result appearance with rich snippets.
 * 
 * @param {SEOData} data - SEO configuration object
 * @returns {string} HTML script tag containing JSON-LD structured data
 * 
 * @example
 * ```typescript
 * const structuredData = generateStructuredData({
 *   type: 'article',
 *   title: 'My Post',
 *   publishedTime: '2025-01-20'
 * })
 * ```
 */
function generateStructuredData(data: SEOData): string {
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

