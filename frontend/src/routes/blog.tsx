import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { apiFetch, ApiException } from '../utils/api'
import { BlogPostSkeleton } from '../components/SkeletonLoader'
import { SEO } from '../components/SEO'
import './blog.css'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  return apiFetch<BlogPost[]>('/blog')
}

export const Route = createFileRoute('/blog')({
  component: Blog,
})

function Blog() {
  const router = useRouterState()
  const isPostPage = router.location.pathname !== '/blog'
  
  // Call useQuery before any early returns to follow React's rules of hooks
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !isPostPage, // Only fetch when not on a post page
  })
  
  // If we're on a post page, render the outlet (child route)
  if (isPostPage) {
    return <Outlet />
  }

  if (isLoading) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="blog-header">
            <h1 className="blog-title">Sci-Fi Musings</h1>
            <p className="blog-subtitle">
              Exploring the infinite possibilities of time, space, and existence
            </p>
          </div>
          <div className="blog-posts">
            <BlogPostSkeleton />
            <BlogPostSkeleton />
            <BlogPostSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    const errorMessage = error instanceof ApiException 
      ? error.message 
      : 'Failed to load blog posts. Please try refreshing the page.'
    
    return (
      <div className="container">
        <div className="error-state">
          <h2 className="error-title">Unable to Load Blog Posts</h2>
          <p className="error-message">{errorMessage}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="error-retry-button"
            aria-label="Retry loading blog posts"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="blog-page">
      <SEO 
        title="Sci-Fi Musings - Blog | Oludotun Longe"
        description="Exploring the infinite possibilities of time, space, and existence"
        url="https://dotunlonge.vercel.app/blog"
        breadcrumbs={[
          { name: 'Home', url: 'https://dotunlonge.vercel.app/' },
          { name: 'Blog', url: 'https://dotunlonge.vercel.app/blog' }
        ]}
      />
      <div className="container">
        <div className="blog-header">
          <h1 className="blog-title">Sci-Fi Musings</h1>
          <p className="blog-subtitle">
            Exploring the infinite possibilities of time, space, and existence
          </p>
        </div>

        <div className="blog-posts">
          {posts?.map((post) => (
            <article key={post.id} className="blog-post-card">
              <div className="post-meta">
                <span className="post-category">{post.category}</span>
                <span className="post-date">{formatDate(post.date)}</span>
              </div>
              <Link 
                to="/blog/$postId" 
                params={{ postId: post.id }}
                className="post-title-link"
              >
                <h2 className="post-title">{post.title}</h2>
              </Link>
              <p className="post-excerpt">{post.excerpt}</p>
              <Link 
                to="/blog/$postId" 
                params={{ postId: post.id }}
                className="read-more"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

