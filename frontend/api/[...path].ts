import type { VercelRequest, VercelResponse } from '@vercel/node'
import { renderSSR } from './ssr'

// Get API base URL from environment or default to Railway
// Set this in Vercel environment variables
const API_BASE_URL = process.env.API_URL || process.env.VITE_API_URL || 'https://your-backend.railway.app'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Get path from request
    let path = req.url || '/'
    
    // Handle Vercel's routing - path might be in req.query
    if (req.query.path && Array.isArray(req.query.path)) {
      path = '/' + req.query.path.join('/')
    } else if (req.query.path) {
      path = '/' + req.query.path
    }
    
    // Remove query string and hash
    const cleanPath = path.split('?')[0].split('#')[0] || '/'
    
    // Skip SSR for static assets and API routes
    if (
      cleanPath.startsWith('/api/') ||
      cleanPath.startsWith('/_next/') ||
      cleanPath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i)
    ) {
      res.status(404).send('Not found')
      return
    }
    
    // Render SSR
    const html = await renderSSR(cleanPath, API_BASE_URL)
    
    // Set proper headers for SEO and performance
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    
    // Send HTML
    res.status(200).send(html)
  } catch (error) {
    console.error('SSR Error:', error)
    
    // Fallback to client-side rendering
    res.status(200).send(getFallbackHTML())
  }
}

function getFallbackHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Oludotun Longe - Senior Software Engineer">
  <title>Oludotun Longe - Senior Software Engineer</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`
}

