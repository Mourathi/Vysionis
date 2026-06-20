import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true"></div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Estúdio de software sob medida</span>

          <h1 className="hero-title">
            Sistemas <span className="gradient-text">sob medida</span> para a sua operação.
          </h1>

          <p className="hero-subtitle">
            Da gestão predial à automação industrial, a Vysionis projeta, desenvolve e mantém o
            software que o seu negócio precisa — web, mobile e back-end.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Fale conosco</a>
            <a href="#projects" className="btn btn-outline">
              Ver projetos <span aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="hero-tags">
            <li>Web</li>
            <li>Mobile</li>
            <li>APIs</li>
            <li>Automação</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <svg className="hero-mark" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B3FD9" />
                <stop offset="55%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="url(#heroMarkGradient)"
              strokeWidth="1"
              strokeDasharray="2 12"
              strokeLinecap="round"
              opacity="0.4"
              className="hero-mark-ring"
            />

            {[...Array(24)].map((_, i) => {
              const angle = (i * 15) - 90
              const startRadius = 40
              const endRadius = 95
              const x1 = 100 + Math.cos((angle * Math.PI) / 180) * startRadius
              const y1 = 100 + Math.sin((angle * Math.PI) / 180) * startRadius
              const x2 = 100 + Math.cos((angle * Math.PI) / 180) * endRadius
              const y2 = 100 + Math.sin((angle * Math.PI) / 180) * endRadius

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#heroMarkGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="hero-mark-ray"
                  style={{ '--ray-i': i }}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
