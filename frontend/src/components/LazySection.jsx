import React, { useState, useEffect, useRef } from 'react'
import './LazySection.css'

function LazySection({ children, fallback = null }) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Calcula quando o elemento está em aproximadamente 2/6 (33%) da viewport
        const viewportHeight = window.innerHeight
        const elementTop = entry.boundingClientRect.top
        const elementVisible = viewportHeight - elementTop
        
        // Só carrega quando o elemento está visível em pelo menos 33% da tela
        if (entry.isIntersecting && elementVisible >= viewportHeight * 0.33 && !shouldLoad) {
          setShouldLoad(true)
          // Pequeno delay para garantir que está realmente visível
          setTimeout(() => {
            setIsVisible(true)
          }, 100)
          observer.disconnect()
        }
      },
      {
        // Sem rootMargin para detectar exatamente quando entra na viewport
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.33]
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
  }, [shouldLoad])

  return (
    <div 
      ref={sectionRef} 
      className={`lazy-section ${isVisible ? 'visible' : ''}`}
    >
      {shouldLoad ? (
        <div className={`lazy-content ${isVisible ? 'show' : ''}`}>
          {children}
        </div>
      ) : (
        <div className="lazy-placeholder">
          {fallback}
        </div>
      )}
    </div>
  )
}

export default LazySection

