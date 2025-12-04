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

  const progressPosition = scrollProgress

  return (
    <div className="scroll-progress-container">
      {/* Linha central com gradiente */}
      <div className="scroll-line" />
      
      {/* Barra de progresso que desce */}
      <div 
        className="scroll-progress-bar" 
        style={{ 
          height: `${scrollProgress}%`,
          '--progress': `${scrollProgress}%`
        }}
      >
        {/* Núcleo de energia que acompanha o progresso */}
        <div 
          className="energy-core"
          style={{ 
            top: `${scrollProgress}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="core-inner" />
          <div className="core-outer" />
          <div className="core-pulse" />
        </div>
      </div>

      {/* Partículas flutuantes */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              '--delay': `${i * 0.2}s`,
              '--duration': `${3 + (i % 3)}s`,
              '--offset': `${(i % 5) * 20}px`
            }}
          />
        ))}
      </div>

      {/* Ondas de energia */}
      <div className="energy-waves">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>
    </div>
  )
}

export default ScrollProgress