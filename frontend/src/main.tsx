import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, NotFoundRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { Route as RootRoute } from './routes/__root'
import { ThemeProvider } from './ThemeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

// Lazy load routes for code splitting
const NotFound = lazy(() => import('./routes/404').then(m => ({ default: m.NotFound })))

// Hydrate from SSR data if available
const initialData = (window as any).__INITIAL_DATA__

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds - shorter cache for fresher data
      gcTime: 1000 * 60 * 5, // 5 minutes - keep in cache
      retry: 3, // Retry failed requests 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: true, // Refetch when window regains focus
      refetchOnMount: true, // Always refetch on mount to get fresh data
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

// 404 route
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => RootRoute,
  component: () => (
    <Suspense fallback={<div className="container"><div className="loading">Loading...</div></div>}>
      <NotFound />
    </Suspense>
  ),
})

const router = createRouter({ 
  routeTree,
  notFoundRoute,
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
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
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
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, but app should still work
    })
  })
}

