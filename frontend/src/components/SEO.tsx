import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  publishedDate?: string
  modifiedDate?: string
  breadcrumbs?: Array<{ name: string; url: string }>
}

/**
 * SEO component that dynamically updates meta tags, Open Graph tags, Twitter Cards,
 * structured data (JSON-LD), and canonical URLs for optimal search engine optimization.
 * 
 * This component:
 * - Updates document title and meta description
 * - Sets Open Graph tags for social media sharing
 * - Configures Twitter Card metadata
 * - Generates structured data (JSON-LD) for Person, WebSite, BlogPosting, and BreadcrumbList schemas
 * - Manages canonical URLs
 * - Handles article-specific metadata for blog posts
 * 
 * @param {SEOProps} props - SEO configuration object
 * @param {string} [props.title] - Page title (defaults to portfolio title)
 * @param {string} [props.description] - Meta description
 * @param {string} [props.image] - Open Graph image URL
 * @param {string} [props.url] - Canonical URL of the page
 * @param {string} [props.type] - Content type ('website' or 'article')
 * @param {string} [props.publishedDate] - ISO date string for article publication
 * @param {string} [props.modifiedDate] - ISO date string for article modification
 * @param {Array<{name: string, url: string}>} [props.breadcrumbs] - Breadcrumb navigation items
 * 
 * @returns {null} This component doesn't render any UI
 * 
 * @example
 * ```tsx
 * <SEO 
 *   title="My Blog Post"
 *   description="A fascinating article about..."
 *   type="article"
 *   publishedDate="2025-01-20"
 *   breadcrumbs={[
 *     { name: 'Home', url: 'https://example.com/' },
 *     { name: 'Blog', url: 'https://example.com/blog' }
 *   ]}
 * />
 * ```
 */
export function SEO({ 
  title = 'Oludotun Longe - Senior Software Engineer',
  description = 'Senior Software Engineer with 8+ years experience building high-performance systems, full-stack applications, and AI/Web3 products.',
  image = '/og-image.png',
  url = 'https://dotunlonge.vercel.app',
  type = 'website',
  publishedDate,
  modifiedDate,
  breadcrumbs
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    /**
     * Updates or creates a meta tag in the document head.
     * 
     * @param {string} name - The name or property attribute value
     * @param {string} content - The content value for the meta tag
     * @param {boolean} [isProperty=false] - If true, uses 'property' attribute (for Open Graph), otherwise 'name'
     */
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('author', 'Oludotun Longe')

    // Open Graph tags
    const fullImageUrl = image && image.startsWith('http') ? image : `https://dotunlonge.vercel.app${image || '/og-image.png'}`
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', fullImageUrl, true)
    updateMetaTag('og:image:width', '1200', true)
    updateMetaTag('og:image:height', '630', true)
    updateMetaTag('og:image:alt', title, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Oludotun Longe Portfolio', true)
    updateMetaTag('og:locale', 'en_US', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', fullImageUrl)
    updateMetaTag('twitter:creator', '@dotunlonge')
    updateMetaTag('twitter:site', '@dotunlonge')

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // Article meta tags for blog posts
    if (type === 'article' && publishedDate) {
      updateMetaTag('article:published_time', publishedDate, true)
      if (modifiedDate) {
        updateMetaTag('article:modified_time', modifiedDate, true)
      }
    }

    // Structured data (JSON-LD)
    const structuredData: any[] = []

    // Person schema (always include)
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Oludotun Longe',
      jobTitle: 'Senior Software Engineer',
      url: 'https://dotunlonge.vercel.app',
      sameAs: [
        'https://github.com/dotunlonge',
        'https://www.linkedin.com/in/oludotunlonge'
      ],
      description: description,
      email: 'olududotunlonge@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG'
      },
      knowsAbout: ['TypeScript', 'Rust', 'AI/ML', 'Web3', 'Full Stack Development']
    })

    // Website schema
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Oludotun Longe Portfolio',
      url: 'https://dotunlonge.vercel.app',
      author: {
        '@type': 'Person',
        name: 'Oludotun Longe'
      }
    })

    // Article schema for blog posts
    if (type === 'article') {
      const articleSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        url: url,
        author: {
          '@type': 'Person',
          name: 'Oludotun Longe',
          url: 'https://dotunlonge.vercel.app'
        },
        publisher: {
          '@type': 'Person',
          name: 'Oludotun Longe'
        }
      }

      if (publishedDate) {
        articleSchema.datePublished = publishedDate
      }
      if (modifiedDate) {
        articleSchema.dateModified = modifiedDate
      }

      structuredData.push(articleSchema)
    }

    // Breadcrumbs schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url
        }))
      })
    }

    // Remove old structured data scripts
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]')
    oldScripts.forEach(script => script.remove())

    // Add new structured data
    structuredData.forEach((data, index) => {
      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-seo-index', index.toString())
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    })
  }, [title, description, image, url, type, publishedDate, modifiedDate, breadcrumbs])

  return null
}

