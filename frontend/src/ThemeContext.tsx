import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * ThemeProvider component that manages theme state (dark/light mode) for the application.
 * 
 * This provider:
 * - Initializes theme from localStorage or defaults to 'dark'
 * - Persists theme preference to localStorage
 * - Applies theme to the document root via data-theme attribute
 * - Provides theme toggle functionality to child components
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that can access theme context
 * 
 * @returns {JSX.Element} ThemeContext.Provider wrapping children
 * 
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  /**
   * Initializes theme state from localStorage or defaults to 'dark'.
   * Uses lazy initialization to avoid reading localStorage on every render.
   */
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as Theme) || 'dark'
  })

  /**
   * Effect that syncs theme state with DOM and localStorage.
   * Updates the data-theme attribute on document.documentElement for CSS theming
   * and persists the preference to localStorage for future sessions.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /**
   * Toggles between 'dark' and 'light' themes.
   * Updates state, which triggers the useEffect to sync with DOM and localStorage.
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Custom hook to access theme context.
 * 
 * Provides access to the current theme and toggleTheme function.
 * Must be used within a ThemeProvider component.
 * 
 * @returns {ThemeContextType} Object containing:
 *   - theme: Current theme ('dark' | 'light')
 *   - toggleTheme: Function to toggle between themes
 * 
 * @throws {Error} If used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme()
 *   return <button onClick={toggleTheme}>Current: {theme}</button>
 * }
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

