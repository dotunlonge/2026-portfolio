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

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }
  return response.json()
}

