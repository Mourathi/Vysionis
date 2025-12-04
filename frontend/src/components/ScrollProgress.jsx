import React, { useState, useEffect } from 'react'
import './ScrollProgress.css'

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      const totalScrollable = documentHeight - windowHeight
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress() // Atualiza na montagem inicial

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    <div className="scroll-progress-container">
      {/* Lado Esquerdo - Sutil */}
      <div className="scroll-side scroll-left">
        <div className="side-line" />
        <div 
          className="side-progress" 
          style={{ height: `${scrollProgress}%` }}
        >
          <div className="progress-glow" />
        </div>
        {/* Partículas sutis */}
        <div className="side-particles">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="side-particle"
              style={{
                '--delay': `${i * 0.3}s`,
                '--duration': `${4 + (i % 2)}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Lado Direito - Destacado com opacidade alta */}
      <div className="scroll-side scroll-right">
        <div className="side-line" />
        <div 
          className="side-progress side-progress-bright" 
          style={{ height: `${scrollProgress}%` }}
        >
          <div className="progress-glow progress-glow-bright" />
          {/* Núcleo de energia que acompanha */}
          <div 
            className="energy-core-right"
            style={{ 
              top: `${scrollProgress}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="core-inner-right" />
            <div className="core-outer-right" />
            <div className="core-pulse-right" />
          </div>
        </div>
        
        {/* Partículas destacadas */}
        <div className="side-particles side-particles-bright">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="side-particle side-particle-bright"
              style={{
                '--delay': `${i * 0.15}s`,
                '--duration': `${3 + (i % 3)}s`,
                '--offset': `${(i % 7) * 15}px`
              }}
            />
          ))}
        </div>

        {/* Ondas de energia */}
        <div className="energy-waves-right">
          <div className="wave-right wave-1" />
          <div className="wave-right wave-2" />
        </div>
      </div>

      {/* Efeito granulado */}
      <div className="grain-overlay" />
    </div>
  )
}

export default ScrollProgress