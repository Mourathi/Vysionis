import React, { useState, useEffect, useRef, Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'
import './LazySection.css'

function LazyWrapper({ children, fallback = <LoadingSpinner /> }) {
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldRender) {
            const viewportHeight = window.innerHeight
            const elementTop = entry.boundingClientRect.top
            const elementBottom = entry.boundingClientRect.bottom
            const elementHeight = elementBottom - elementTop
            const visibleHeight = Math.min(elementBottom, viewportHeight) - Math.max(elementTop, 0)
            
            // Só renderiza quando pelo menos 33% (2/6) do elemento estiver visível
            const visibleRatio = visibleHeight / viewportHeight
            
            if (visibleRatio >= 0.33) {
              setShouldRender(true)
              // Delay para animação suave
              setTimeout(() => {
                setIsVisible(true)
              }, 150)
              observer.disconnect()
            }
          }
        })
      },
      {
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.33, 0.5]
      }
    )

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current)
      }
      observer.disconnect()
    }
  }, [shouldRender])

  return (
    <div 
      ref={wrapperRef} 
      className={`lazy-wrapper ${isVisible ? 'visible' : ''}`}
    >
      {shouldRender ? (
        <div className={`lazy-content ${isVisible ? 'show' : ''}`}>
          <Suspense fallback={fallback}>
            {children}
          </Suspense>
        </div>
      ) : (
        <div className="lazy-placeholder">
          {fallback}
        </div>
      )}
    </div>
  )
}

export default LazyWrapper

