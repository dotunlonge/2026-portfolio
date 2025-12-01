import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { ThemeToggle } from '../components/ThemeToggle'
import { useMenuStore } from '../stores/menuStore'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { SEO } from '../components/SEO'
import '../App.css'

function RootComponent() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuStore()
  const navLinksRef = useRef<HTMLDivElement>(null)

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen && navLinksRef.current) {
      // Focus first link when menu opens
      const firstLink = navLinksRef.current.querySelector('a, button') as HTMLElement
      if (firstLink) {
        firstLink.focus()
      }
    }
  }, [isMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, closeMenu])

  return (
    <div className="app">
      <SEO />
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="nav-logo" onClick={closeMenu}>
              <span className="logo-text">OL</span>
            </Link>
            <button 
              className="nav-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="nav-links"
            >
              <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div 
              ref={navLinksRef}
              id="nav-links"
              className={`nav-links ${isMenuOpen ? 'open' : ''}`}
              role="menu"
              aria-hidden={!isMenuOpen}
            >
              <Link to="/" className="nav-link" onClick={closeMenu} role="menuitem">Home</Link>
              <Link to="/blog" className="nav-link" onClick={closeMenu} role="menuitem">Blog</Link>
              <Link to="/games" className="nav-link" onClick={closeMenu} role="menuitem">Games</Link>
              <a 
                href="/Oludotun Longe - Software Engineer Resume.pdf" 
                download="Oludotun-Longe-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link resume-link"
                onClick={closeMenu}
                aria-label="Download resume"
              >
                Resume
              </a>
              <a href="https://github.com/dotunlonge" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu} role="menuitem" aria-label="Visit GitHub profile">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/oludotunlonge" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu} role="menuitem" aria-label="Visit LinkedIn profile">
                LinkedIn
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <p>&copy; 2025 Oludotun Longe. Built with C++ & React.</p>
        </div>
      </footer>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})

