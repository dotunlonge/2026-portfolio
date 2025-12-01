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

/**
 * LazyImage component that implements lazy loading for images using IntersectionObserver.
 * 
 * This component:
 * - Only loads images when they're about to enter the viewport (50px margin)
 * - Shows a skeleton loader while the image is loading
 * - Handles loading errors gracefully
 * - Supports both 'lazy' and 'eager' loading strategies
 * - Uses native browser lazy loading as a fallback
 * 
 * @param {LazyImageProps} props - Image component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.width] - Image width in pixels
 * @param {number} [props.height] - Image height in pixels
 * @param {'lazy' | 'eager'} [props.loading='lazy'] - Loading strategy ('lazy' uses IntersectionObserver, 'eager' loads immediately)
 * 
 * @returns {JSX.Element} A div wrapper containing the image with lazy loading behavior
 * 
 * @example
 * ```tsx
 * <LazyImage 
 *   src="/hero-image.jpg"
 *   alt="Hero image"
 *   width={1200}
 *   height={600}
 *   loading="lazy"
 * />
 * ```
 */
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

    /**
     * IntersectionObserver callback that triggers image loading when the element
     * enters the viewport (with 50px margin for smoother UX).
     */
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

  /**
   * Handles successful image load event.
   * Updates state to hide skeleton loader and show the image.
   */
  const handleLoad = () => {
    setIsLoaded(true)
  }

  /**
   * Handles image load error event.
   * Updates state to show error message instead of the image.
   */
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

