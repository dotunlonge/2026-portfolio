// SSR rendering function for Vercel (TypeScript)
import type { VercelRequest, VercelResponse } from '@vercel/node'

// For SSR, we'll use a simpler approach that works with Vercel's serverless functions
// Since TanStack Router SSR is complex, we'll render a basic HTML shell with data injection

export async function renderSSR(url: string, apiBaseUrl: string): Promise<string> {
  let seoData: any = {
    title: 'Oludotun Longe - Senior Software Engineer',
    description: 'Senior Software Engineer with 8+ years experience building high-performance systems, full-stack applications, and AI/Web3 products.',
    url: `https://dotunlonge.vercel.app${url === '/' ? '' : url}`,
  }
  
  let initialData: Record<string, any> = {}
  
  // Fetch data based on route
  try {
    if (url === '/' || url === '') {
      // Fetch homepage data
      const [personalRes, projectsRes, workRes] = await Promise.all([
        fetch(`${apiBaseUrl}/api/personal`),
        fetch(`${apiBaseUrl}/api/projects`),
        fetch(`${apiBaseUrl}/api/work-experience`),
      ])
      
      const [personal, projects, workExperience] = await Promise.all([
        personalRes.json(),
        projectsRes.json(),
        workRes.json(),
      ])
      
      initialData = {
        personal,
        projects,
        workExperience,
      }
      
      if (personal) {
        seoData = {
          ...seoData,
          title: `${personal.name} - ${personal.title}`,
          description: personal.summary,
        }
      }
    } else if (url.startsWith('/blog/')) {
      const postId = url.split('/blog/')[1]?.split('?')[0]
      if (postId) {
        const res = await fetch(`${apiBaseUrl}/api/blog/${postId}`)
        if (res.ok) {
          const post = await res.json()
          initialData = { blogPost: post }
          
          seoData = {
            title: `${post.title} | Oludotun Longe`,
            description: post.excerpt || post.content.substring(0, 160),
            type: 'article',
            publishedTime: post.date,
            tags: [post.category, 'Science Fiction', 'Technology'],
            url: `https://dotunlonge.vercel.app/blog/${postId}`,
          }
        }
      }
    } else if (url === '/blog') {
      const res = await fetch(`${apiBaseUrl}/api/blog`)
      if (res.ok) {
        const posts = await res.json()
        initialData = { blogPosts: posts }
        
        seoData = {
          ...seoData,
          title: 'Sci-Fi Musings | Blog | Oludotun Longe',
          description: 'Exploring the infinite possibilities of time, space, and existence through science fiction articles.',
          url: 'https://dotunlonge.vercel.app/blog',
        }
      }
    }
  } catch (error) {
    console.error('Error fetching data for SSR:', error)
    // Continue with default SEO data
  }

  return getHTMLTemplate(seoData, initialData)
}

function getHTMLTemplate(seoData: any, initialData: Record<string, any>) {
  const metaTags = generateMetaTags(seoData)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${metaTags}
  <style id="ssr-styles">${getCriticalCSS()}</style>
</head>
<body>
  <div id="root"></div>
  <script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};</script>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`
}

function getCriticalCSS() {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e0e0e0; }
    #root { min-height: 100vh; }
  `
}

function generateMetaTags(data: any): string {
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

  function generateStructuredData() {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'Person',
      name: title,
      description: description,
      url: url,
    }

    if (type === 'article') {
      return `<script type="application/ld+json">${JSON.stringify({
        ...baseSchema,
        '@type': 'BlogPosting',
        headline: title,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: {
          '@type': 'Person',
          name: author,
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

  const metaTags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="author" content="${escapeHtml(author)}">`,
    ...tags.map((tag: string) => `<meta name="keywords" content="${escapeHtml(tag)}">`),
    
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
      ...tags.map((tag: string) => `<meta property="article:tag" content="${escapeHtml(tag)}">`),
    ].filter(Boolean) : []),
    
    // Canonical URL
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    
    // Structured Data (JSON-LD)
    generateStructuredData(),
  ].filter(Boolean).join('\n  ')

  return metaTags
}

