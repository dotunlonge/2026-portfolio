import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import './blog.$postId.css'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
}

const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function fetchBlogPost(postId: string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE}/blog/${postId}`)
  if (!response.ok) throw new Error('Failed to fetch blog post')
  return response.json()
}

export const Route = createFileRoute('/blog/$postId')({
  component: BlogPostDetail,
})

function BlogPostDetail() {
  const { postId } = Route.useParams()
  const { data: post, isLoading } = useQuery({
    queryKey: ['blogPost', postId],
    queryFn: () => fetchBlogPost(postId),
  })

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading article...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container">
        <div className="error">Article not found</div>
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

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="content-paragraph">
        {paragraph}
      </p>
    ))
  }

  return (
    <div className="blog-post-page">
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
            {formatContent(post.content)}
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

