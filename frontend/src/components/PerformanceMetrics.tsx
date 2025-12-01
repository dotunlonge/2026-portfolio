import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  apiResponseTime: number
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or if explicitly enabled
    if (import.meta.env.DEV || localStorage.getItem('showMetrics') === 'true') {
      setIsVisible(true)
      
      // Calculate performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0
      
      // Measure render time
      const renderStart = performance.now()
      requestAnimationFrame(() => {
        const renderTime = performance.now() - renderStart
        
        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          apiResponseTime: 0 // Will be updated by API calls
        })
      })
    }
  }, [])

  if (!isVisible || !metrics) return null

  return (
    <div className="performance-metrics" style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#00d4ff',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.75rem',
      fontFamily: 'monospace',
      zIndex: 1000,
      border: '1px solid rgba(0, 212, 255, 0.3)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>Performance</div>
      <div>Load: {metrics.loadTime}ms</div>
      <div>Render: {metrics.renderTime}ms</div>
      {metrics.apiResponseTime > 0 && <div>API: {metrics.apiResponseTime}ms</div>}
    </div>
  )
}

