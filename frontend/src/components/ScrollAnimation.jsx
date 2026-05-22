import React, { useState, useEffect, useRef } from 'react'
import './ScrollAnimation.css'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Anima entrada ao entrar na viewport. `variant`: up | left | right. */
function ScrollAnimation({ children, delay = 0, variant = 'up' }) {
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== 'undefined' ? prefersReducedMotion() : false
  )
  const elementRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -6% 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <div 
      ref={elementRef} 
      className={`scroll-animation slide-${variant} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  )
}

export default ScrollAnimation

