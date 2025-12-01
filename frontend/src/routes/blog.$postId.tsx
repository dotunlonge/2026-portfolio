import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import { apiFetch, ApiException } from '../utils/api'
import { BlogPostSkeleton } from '../components/SkeletonLoader'
import { SEO } from '../components/SEO'
import './blog.$postId.css'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
}

async function fetchBlogPost(postId: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`/blog/${postId}`)
}

export const Route = createFileRoute('/blog/$postId')({
  component: BlogPostDetail,
})

function BlogPostDetail() {
  const { postId } = Route.useParams()
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', postId],
    queryFn: () => fetchBlogPost(postId),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  if (isLoading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <BlogPostSkeleton />
        </div>
      </div>
    )
  }

  if (error || !post) {
    const errorMessage = error instanceof ApiException 
      ? error.message 
      : 'Article not found or failed to load. Please try again.'
    
    return (
      <div className="container">
        <div className="error-state">
          <h2 className="error-title">Unable to Load Article</h2>
          <p className="error-message">{errorMessage}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/blog" className="error-retry-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Back to Blog
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="error-retry-button"
              aria-label="Retry loading article"
            >
              Retry
            </button>
          </div>
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
    <div className="blog-post-page">
      <SEO 
        title={`${post.title} | Oludotun Longe`}
        description={post.excerpt}
        url={`https://dotunlonge.vercel.app/blog/${post.id}`}
        type="article"
        publishedDate={post.date}
        breadcrumbs={[
          { name: 'Home', url: 'https://dotunlonge.vercel.app/' },
          { name: 'Blog', url: 'https://dotunlonge.vercel.app/blog' },
          { name: post.title, url: `https://dotunlonge.vercel.app/blog/${post.id}` }
        ]}
      />
      <div className="container">
        <Link to="/blog" className="back-link">
          ← Back to Blog
        </Link>

        <article className="blog-post-article">
          <div className="article-meta">
            <span className="article-category">{post.category}</span>
            <span className="article-date">{formatDate(post.date)}</span>
          </div>

          <h1 className="article-title">{post.title}</h1>
          
          <div className="article-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="article-footer">
            <Link to="/blog" className="back-to-blog">
              ← Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

