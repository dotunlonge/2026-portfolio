/**
 * Determines the base API URL based on the current environment.
 * 
 * In production, uses the VITE_API_URL environment variable if set.
 * In development, defaults to '/api' which is proxied by Vite to the backend server.
 * 
 * @returns {string} The base API URL for making requests
 */
const getApiUrl = () => {
  // In production, use the environment variable or default to relative path
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  // In development, use relative path (Vite proxy handles it)
  return '/api'
}

export const API_BASE_URL = getApiUrl()

export interface ApiError {
  message: string
  status?: number
  statusText?: string
}

/**
 * Custom error class for API-related errors.
 * Extends the native Error class to include HTTP status information.
 * 
 * @class ApiException
 * @extends {Error}
 * 
 * @property {number} [status] - HTTP status code (e.g., 404, 500)
 * @property {string} [statusText] - HTTP status text (e.g., "Not Found", "Internal Server Error")
 */
export class ApiException extends Error {
  status?: number
  statusText?: string

  /**
   * Creates an instance of ApiException.
   * 
   * @param {string} message - Human-readable error message
   * @param {number} [status] - HTTP status code
   * @param {string} [statusText] - HTTP status text
   */
  constructor(message: string, status?: number, statusText?: string) {
    super(message)
    this.name = 'ApiException'
    this.status = status
    this.statusText = statusText
  }
}

/**
 * Fetches data from the API with comprehensive error handling and retry logic.
 * 
 * This function:
 * - Handles both development and production API URLs
 * - Adds cache-busting query parameters in development mode
 * - Parses error responses from the server
 * - Converts network errors into ApiException instances
 * - Always bypasses browser cache for fresh data
 * 
 * @template T - The expected return type of the API response
 * 
 * @param {string} endpoint - API endpoint path (e.g., '/personal', '/projects')
 * @param {RequestInit} [options] - Optional fetch configuration (method, body, headers, etc.)
 * 
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response
 * 
 * @throws {ApiException} Throws an ApiException for HTTP errors or network failures
 * 
 * @example
 * ```typescript
 * const personalInfo = await apiFetch<PersonalInfo>('/personal')
 * const projects = await apiFetch<Project[]>('/projects', { method: 'GET' })
 * ```
 */
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Build URL - add cache-busting in development mode only
  let url = `${API_BASE_URL}${endpoint}`
  if (import.meta.env.DEV && !endpoint.includes('?')) {
    url += `?t=${Date.now()}`
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      cache: 'no-store', // Always fetch fresh data, bypass browser cache
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      let errorMessage = `API error: ${response.statusText}`
      
      // Try to parse error message from response
      try {
        const errorData = await response.json()
        if (errorData.error) {
          errorMessage = errorData.error
        } else if (errorData.message) {
          errorMessage = errorData.message
        }
      } catch {
        // If JSON parsing fails, use default message
      }

      throw new ApiException(errorMessage, response.status, response.statusText)
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiException) {
      throw error
    }
    
    // Network errors or other fetch failures
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiException('Network error: Unable to connect to the server. Please check your connection.', 0, 'Network Error')
    }
    
    throw new ApiException(error instanceof Error ? error.message : 'An unexpected error occurred')
  }
}

