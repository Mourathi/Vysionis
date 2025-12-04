import React, { useState } from 'react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container header-content">
        <a href="#home" className="logo-link">
          <svg className="header-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  stroke="url(#headerLogoGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity={0.8}
                />
              );
            })}
          </svg>
          <span className="logo-text">VYSIONIS</span>
        </a>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>Sobre</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projetos</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>Serviços</a>
          <a href="#technologies" onClick={() => setIsMenuOpen(false)}>Tecnologias</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="nav-cta">Contato</a>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
        </button>
      </div>
    </header>
  )
}

export default Header



