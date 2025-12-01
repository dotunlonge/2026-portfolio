import React, { Component, ErrorInfo, ReactNode } from 'react'
import './ErrorBoundary.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the entire app.
 * 
 * This is a class component because React Error Boundaries must be class components.
 * It implements the required lifecycle methods to catch errors during rendering,
 * in lifecycle methods, and in constructors of the whole tree below them.
 * 
 * @class ErrorBoundary
 * @extends {Component<Props, State>}
 */
export class ErrorBoundary extends Component<Props, State> {
  /**
   * Creates an instance of ErrorBoundary.
   * 
   * @param {Props} props - Component props
   */
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  /**
   * React lifecycle method that is called when an error is thrown.
   * Updates state so the next render will show the fallback UI.
   * 
   * @static
   * @param {Error} error - The error that was thrown
   * @returns {State} New state object with hasError set to true
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  /**
   * React lifecycle method called after an error has been thrown.
   * Used for logging error information. In production, this would typically
   * send error details to an error reporting service like Sentry.
   * 
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Additional error information from React
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    // In production, you'd send this to an error reporting service
  }

  /**
   * Resets the error state and redirects to the home page.
   * Called when the user clicks the "Go to Home" button in the error UI.
   */
  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h1 className="error-boundary-title">Something went wrong</h1>
            <p className="error-boundary-message">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className="error-boundary-details">
                <summary>Error details (development only)</summary>
                <pre className="error-boundary-stack">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="error-boundary-actions">
              <button onClick={this.handleReset} className="error-boundary-button">
                Go to Home
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="error-boundary-button error-boundary-button-secondary"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

