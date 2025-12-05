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
      {/* Lado Esquerdo - Completo e Moderno */}
      <div className="scroll-side scroll-left">
        <div className="side-line" />
        <div 
          className="side-progress side-progress-bright" 
          style={{ height: `${scrollProgress}%` }}
        >
          <div className="progress-glow progress-glow-bright" />
          {/* Núcleo de energia que acompanha */}
          <div 
            className="energy-core energy-core-left"
            style={{ 
              top: `${scrollProgress}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="core-inner" />
            <div className="core-outer" />
            <div className="core-pulse" />
            <div className="core-sparkles">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="sparkle"
                  style={{
                    '--angle': `${i * 60}deg`,
                    '--delay': `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
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
        <div className="energy-waves">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>

        {/* Linhas de conexão */}
        <div className="connection-lines">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="connection-line"
              style={{
                '--delay': `${i * 0.4}s`,
                '--progress': `${scrollProgress}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Lado Direito - Completo e Moderno */}
      <div className="scroll-side scroll-right">
        <div className="side-line" />
        <div 
          className="side-progress side-progress-bright" 
          style={{ height: `${scrollProgress}%` }}
        >
          <div className="progress-glow progress-glow-bright" />
          {/* Núcleo de energia que acompanha */}
          <div 
            className="energy-core energy-core-right"
            style={{ 
              top: `${scrollProgress}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="core-inner" />
            <div className="core-outer" />
            <div className="core-pulse" />
            <div className="core-sparkles">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="sparkle"
                  style={{
                    '--angle': `${i * 60}deg`,
                    '--delay': `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
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
        <div className="energy-waves">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>

        {/* Linhas de conexão */}
        <div className="connection-lines">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="connection-line"
              style={{
                '--delay': `${i * 0.4}s`,
                '--progress': `${scrollProgress}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Efeito granulado */}
      <div className="grain-overlay" />
      
      {/* Efeito de profundidade */}
      <div className="depth-overlay" />
    </div>
  )
}

export default ScrollProgress