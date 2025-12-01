import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import './blog.css'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
}

const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${API_BASE}/blog`)
  if (!response.ok) throw new Error('Failed to fetch blog posts')
  return response.json()
}

export const Route = createFileRoute('/blog')({
  component: Blog,
})

function Blog() {
  const router = useRouterState()
  const isPostPage = router.location.pathname !== '/blog'
  
  // If we're on a post page, render the outlet (child route)
  if (isPostPage) {
    return <Outlet />
  }

  // Otherwise, render the blog list
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  })

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading articles...</div>
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
                {/* <span className="post-date">{formatDate(post.date)}</span> */}
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

