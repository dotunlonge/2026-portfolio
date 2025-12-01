import { useState, useRef, useEffect } from 'react'
import './LazyImage.css'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(loading === 'eager')
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [loading])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
  }

  return (
    <div className={`lazy-image-wrapper ${className}`} ref={imgRef}>
      {!isLoaded && !hasError && isInView && (
        <div className="lazy-image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      {hasError ? (
        <div className="lazy-image-error">
          <span>Failed to load image</span>
        </div>
      ) : (
        <img
          src={isInView ? src : undefined}
          alt={alt}
          width={width}
          height={height}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
        />
      )}
    </div>
  )
}

