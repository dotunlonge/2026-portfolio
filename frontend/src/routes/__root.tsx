import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '../components/ThemeToggle'
import { useMenuStore } from '../stores/menuStore'
import '../App.css'

function RootComponent() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuStore()

  return (
    <div className="app">
      <nav className="nav">
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
            >
              <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
              <Link to="/blog" className="nav-link" onClick={closeMenu}>Blog</Link>
              <a 
                href="/Oludotun Longe - Software Engineer Resume.pdf" 
                download="Oludotun-Longe-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link resume-link"
                onClick={closeMenu}
              >
                Resume
              </a>
              <a href="https://github.com/dotunlonge" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/oludotunlonge" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu}>
                LinkedIn
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
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

