import React, { useEffect, useRef } from 'react'
import './ScrollProgress.css'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function clamp01(n) {
  return Math.min(100, Math.max(0, n))
}

function ScrollProgress() {
  /** Traço da barra e linhas guiadas pelo requestAnimationFrame (sem re-render pesado). */
  const leftBarRef = useRef(null)
  const rightBarRef = useRef(null)
  const leftCoreRef = useRef(null)
  const rightCoreRef = useRef(null)
  const leftLinesRef = useRef(null)
  const rightLinesRef = useRef(null)

  const targetRef = useRef(0)
  const smoothRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const computeProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop ?? 0
      const totalScrollable = documentHeight - windowHeight
      return totalScrollable > 0 ? clamp01((scrollTop / totalScrollable) * 100) : 0
    }

    const smoothEnabled = !prefersReducedMotion()

    const applyRefs = () => {
      const s = clamp01(smoothRef.current)

      leftBarRef.current?.style?.setProperty('height', `${s}%`)
      rightBarRef.current?.style?.setProperty('height', `${s}%`)

      if (leftCoreRef.current?.style && rightCoreRef.current?.style) {
        leftCoreRef.current.style.top = `${s}%`
        leftCoreRef.current.style.transform = 'translate(-50%, -50%)'
        rightCoreRef.current.style.top = `${s}%`
        rightCoreRef.current.style.transform = 'translate(-50%, -50%)'
      }

      leftLinesRef.current?.style?.setProperty('--trail', `${s}%`)
      rightLinesRef.current?.style?.setProperty('--trail', `${s}%`)
    }

    const kickSmoothTick = () => {
      cancelAnimationFrame(rafRef.current)
      const tick = () => {
        const t = targetRef.current
        let s = smoothRef.current
        const delta = t - s
        if (Math.abs(delta) < 0.05) {
          s = t
        } else {
          s += delta * (0.09 + Math.min(0.16, Math.abs(delta) / 380))
        }
        smoothRef.current = clamp01(s)
        applyRefs()

        const stillMoving = smoothEnabled && Math.abs(targetRef.current - smoothRef.current) > 0.12
        if (stillMoving) {
          rafRef.current = requestAnimationFrame(tick)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      const p = computeProgress()
      targetRef.current = p

      if (!smoothEnabled) {
        smoothRef.current = p
        applyRefs()
        return
      }

      kickSmoothTick()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    if (smoothEnabled) {
      smoothRef.current = targetRef.current
      applyRefs()
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="scroll-progress-container">
      {/* Lado Esquerdo - Completo e Moderno */}
      <div className="scroll-side scroll-left">
        <div className="side-line" />
        <div 
          ref={leftBarRef}
          className="side-progress side-progress-bright"
        >
          <div className="progress-glow progress-glow-bright" />
          <div className="progress-sheen" aria-hidden />
          {/* Núcleo de energia que acompanha */}
          <div 
            ref={leftCoreRef}
            className="energy-core energy-core-left"
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
                '--offset': `${(i % 7) * 15}px`,
                '--sx': '1',
              }}
            />
          ))}
        </div>

        {/* Ondas de energia */}
        <div className="energy-waves energy-waves-left">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>

        {/* Linhas de conexão */}
        <div ref={leftLinesRef} className="connection-lines">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="connection-line"
              style={{
                '--delay': `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Lado Direito - Completo e Moderno */}
      <div className="scroll-side scroll-right">
        <div className="side-line" />
        <div 
          ref={rightBarRef}
          className="side-progress side-progress-bright side-progress-reverse"
        >
          <div className="progress-glow progress-glow-bright" />
          <div className="progress-sheen progress-sheen-reverse" aria-hidden />
          {/* Núcleo de energia que acompanha */}
          <div 
            ref={rightCoreRef}
            className="energy-core energy-core-right"
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
                '--offset': `${(i % 7) * 15}px`,
                '--sx': '-1',
              }}
            />
          ))}
        </div>

        {/* Ondas de energia */}
        <div className="energy-waves energy-waves-right">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>

        {/* Linhas de conexão */}
        <div ref={rightLinesRef} className="connection-lines">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="connection-line"
              style={{
                '--delay': `${i * 0.4}s`,
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