import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './ThemeContext'
import './index.css'

// Hydrate from SSR data if available
const initialData = (window as any).__INITIAL_DATA__

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - cache data for better performance
      gcTime: 1000 * 60 * 10, // 10 minutes - keep in cache
      retry: 3, // Retry failed requests 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false, // Don't refetch on window focus
    },
  },
})

// Hydrate query cache with SSR data
if (initialData) {
  // Handle new simplified data structure from SSR
  if (initialData.personal) {
    queryClient.setQueryData(['personal'], initialData.personal)
  }
  if (initialData.projects) {
    queryClient.setQueryData(['projects'], initialData.projects)
  }
  if (initialData.workExperience) {
    queryClient.setQueryData(['workExperience'], initialData.workExperience)
  }
  if (initialData.blogPost) {
    // Extract postId from URL
    const postId = window.location.pathname.split('/blog/')[1] || 'unknown'
    queryClient.setQueryData(['blogPost', postId], initialData.blogPost)
  }
  if (initialData.blogPosts) {
    queryClient.setQueryData(['blogPosts'], initialData.blogPosts)
  }
  
  // Also handle old format with queries object (for backwards compatibility)
  if (initialData.queries) {
    Object.entries(initialData.queries).forEach(([key, data]) => {
      try {
        const queryKey = JSON.parse(key)
        queryClient.setQueryData(queryKey, data)
      } catch (e) {
        console.warn('Failed to hydrate query:', key)
      }
    })
  }
}

const router = createRouter({ 
  routeTree,
  // Enable preloading for better perceived performance
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Use hydrateRoot for SSR hydration
const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  // SSR: Hydrate existing HTML
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
} else {
  // CSR: Render from scratch (fallback)
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

