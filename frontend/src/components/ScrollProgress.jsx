import React, { useEffect, useRef } from 'react'
import './ScrollProgress.css'

function clamp01(n) {
  return Math.min(1, Math.max(0, n))
}

/** Barra de progresso fina no topo, guiada por scroll (sem re-render). */
function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar"></div>
    </div>
  )
}

export default ScrollProgress
