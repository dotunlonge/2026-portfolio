import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '../components/ThemeToggle'
import '../App.css'

export const Route = createRootRoute({
  component: () => (
    <div className="app">
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="nav-logo">
              <span className="logo-text">OL</span>
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <a 
                href="/Oludotun Longe - Software Engineer Resume.pdf" 
                download="Oludotun-Longe-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link resume-link"
              >
                Resume
              </a>
              <a href="https://github.com/dotunlonge" target="_blank" rel="noopener noreferrer" className="nav-link">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/oludotunlonge" target="_blank" rel="noopener noreferrer" className="nav-link">
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
  ),
})

