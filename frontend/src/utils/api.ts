// API utility to handle both development and production URLs
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

export class ApiException extends Error {
  status?: number
  statusText?: string

  constructor(message: string, status?: number, statusText?: string) {
    super(message)
    this.name = 'ApiException'
    this.status = status
    this.statusText = statusText
  }
}

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

