import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      
      <div className="container hero-content">
        <div className="logo-container">
          <svg className="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B3FD9" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            
            {/* Linhas radiantes do V */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15) - 90;
              const startRadius = 40;
              const endRadius = 95;
              const x1 = 100 + Math.cos(angle * Math.PI / 180) * startRadius;
              const y1 = 100 + Math.sin(angle * Math.PI / 180) * startRadius;
              const x2 = 100 + Math.cos(angle * Math.PI / 180) * endRadius;
              const y2 = 100 + Math.sin(angle * Math.PI / 180) * endRadius;
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#logoGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity={0.8}
                  className="logo-line"
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              );
            })}
          </svg>
        </div>
        
        <h1 className="hero-title">
          Desenvolvemos <span className="gradient-text">Soluções</span> que Transformam Negócios
        </h1>
        
        <p className="hero-subtitle">
          Especialistas em criar sistemas modernos e escaláveis usando as tecnologias mais avançadas do mercado
        </p>
        
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Fale Conosco</a>
          <a href="#projects" className="btn btn-outline">Ver Projetos</a>
        </div>
        
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
