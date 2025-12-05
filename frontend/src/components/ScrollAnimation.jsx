import React, { useState, useEffect, useRef } from 'react'
import './ScrollAnimation.css'

function ScrollAnimation({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
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
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
      observer.disconnect()
    }
  }, [delay])

  return (
    <div 
      ref={elementRef} 
      className={`scroll-animation ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  )
}

export default ScrollAnimation

