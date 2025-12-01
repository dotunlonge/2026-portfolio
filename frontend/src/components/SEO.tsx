import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export function SEO({ 
  title = 'Oludotun Longe - Senior Software Engineer',
  description = 'Senior Software Engineer with 8+ years experience building high-performance systems, full-stack applications, and AI/Web3 products.',
  image = '/og-image.png',
  url = 'https://dotunlonge.vercel.app',
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
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
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Oludotun Longe Portfolio', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)

    // Structured data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Oludotun Longe',
      jobTitle: 'Senior Software Engineer',
      url: url,
      sameAs: [
        'https://github.com/dotunlonge',
        'https://www.linkedin.com/in/oludotunlonge'
      ],
      description: description
    }

    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)
  }, [title, description, image, url, type])

  return null
}

