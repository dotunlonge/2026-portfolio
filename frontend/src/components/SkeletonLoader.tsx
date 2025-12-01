import './SkeletonLoader.css'

interface SkeletonLoaderProps {
  count?: number
  className?: string
}

export function SkeletonLoader({ count = 1, className = '' }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`}>
          <div className="skeleton-shimmer"></div>
        </div>
      ))}
    </>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="project-card skeleton-card">
      <div className="skeleton-shimmer"></div>
      <div className="skeleton-header">
        <SkeletonLoader className="skeleton-title" />
        <SkeletonLoader className="skeleton-period" />
      </div>
      <SkeletonLoader className="skeleton-text skeleton-text-large" />
      <SkeletonLoader className="skeleton-text" />
      <SkeletonLoader className="skeleton-text skeleton-text-short" />
      <div className="skeleton-tags">
        <SkeletonLoader className="skeleton-tag" />
        <SkeletonLoader className="skeleton-tag" />
        <SkeletonLoader className="skeleton-tag" />
      </div>
    </div>
  )
}

export function WorkCardSkeleton() {
  return (
    <div className="work-card skeleton-card">
      <div className="skeleton-shimmer"></div>
      <div className="skeleton-header">
        <div>
          <SkeletonLoader className="skeleton-title" />
          <SkeletonLoader className="skeleton-text skeleton-text-medium" />
          <SkeletonLoader className="skeleton-text skeleton-text-small" />
        </div>
        <SkeletonLoader className="skeleton-period" />
      </div>
      <SkeletonLoader className="skeleton-text" />
      <SkeletonLoader className="skeleton-text" />
      <div className="skeleton-tags">
        <SkeletonLoader className="skeleton-tag" />
        <SkeletonLoader className="skeleton-tag" />
        <SkeletonLoader className="skeleton-tag" />
      </div>
    </div>
  )
}

export function BlogPostSkeleton() {
  return (
    <article className="blog-post-card skeleton-card">
      <div className="skeleton-shimmer"></div>
      <div className="skeleton-meta">
        <SkeletonLoader className="skeleton-tag" />
      </div>
      <SkeletonLoader className="skeleton-title skeleton-title-large" />
      <SkeletonLoader className="skeleton-text" />
      <SkeletonLoader className="skeleton-text skeleton-text-short" />
      <SkeletonLoader className="skeleton-link" />
    </article>
  )
}

