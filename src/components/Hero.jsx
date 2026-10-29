import React from 'react'
import './Hero.css'

// Arredondados: Node e navegador divergem nas últimas casas de Math.cos/sin,
// o que quebraria a hidratação.
const round = (n) => Math.round(n * 100) / 100

// Raios da marca radiante (mesmo desenho do logo)
const RAYS = Array.from({ length: 24 }, (_, i) => {
  const angle = ((i * 15 - 90) * Math.PI) / 180
  return {
    x1: round(100 + Math.cos(angle) * 40),
    y1: round(100 + Math.sin(angle) * 40),
    x2: round(100 + Math.cos(angle) * 95),
    y2: round(100 + Math.sin(angle) * 95),
  }
})

function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="container">
        <div className="bento bento--m2 hero-bento">
          <div className="tile w-3 h-2 hero-intro">
            <span className="tile-label">Estúdio de software sob medida</span>

            <h1 className="display hero-title">
              Sistemas <span className="gradient-text">sob medida.</span>
            </h1>

            <div className="hero-foot">
              <p className="hero-subtitle">Web, mobile e back-end para a sua operação.</p>
              <a href="#contact" className="btn btn-primary">Fale conosco</a>
            </div>
          </div>

          <div className="tile tile--gradient hero-mark-tile" aria-hidden="true">
            <svg className="hero-mark" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 12"
                strokeLinecap="round"
                opacity="0.5"
                className="hero-mark-ring"
              />
              {RAYS.map((ray, i) => (
                <line
                  key={i}
                  {...ray}
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="hero-mark-ray"
                  style={{ '--ray-i': i }}
                />
              ))}
            </svg>
          </div>

          <div className="tile tile--ink hero-status">
            <span className="hero-status-badge">
              <span className="hero-status-dot" aria-hidden="true"></span>
              Disponível
            </span>
            <p className="display hero-status-city tile-bottom">São Paulo</p>
          </div>
        </div>

        <a href="#about" className="scroll-cue">
          Role <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
