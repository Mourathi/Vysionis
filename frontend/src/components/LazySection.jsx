import React, { useState, useEffect, useRef } from 'react'
import './LazySection.css'

function LazySection({ children, fallback = null, rootMargin = '150px' }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          // Pequeno delay para suavizar a transição
          setTimeout(() => {
            setIsVisible(true)
            setHasLoaded(true)
          }, 50)
          // Desconectar após carregar para melhor performance
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold: 0.01
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      observer.disconnect()
    }
  }, [hasLoaded, rootMargin])

  return (
    <div 
      ref={sectionRef} 
      className={`lazy-section ${hasLoaded ? 'loaded' : ''}`}
    >
      {isVisible ? (
        <div className="lazy-content">
          {children}
        </div>
      ) : (
        fallback
      )}
    </div>
  )
}

export default LazySection

