import { Link } from '@tanstack/react-router'
import { SEO } from '../components/SEO'
import './404.css'

export function NotFound() {
  return (
    <div className="not-found-page">
      <SEO 
        title="404 - Page Not Found | Oludotun Longe"
        description="The page you're looking for doesn't exist."
        url="https://dotunlonge.vercel.app/404"
      />
      <div className="container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-button">
              Go to Home
            </Link>
            <Link to="/blog" className="not-found-button not-found-button-secondary">
              Visit Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
