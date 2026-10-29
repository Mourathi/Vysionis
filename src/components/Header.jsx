import React, { useState } from 'react'
import './Header.css'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { label: 'Sobre', href: '#about' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Serviços', href: '#services' },
  { label: 'Stack', href: '#technologies' },
]

// Arredondados: Node e navegador divergem nas últimas casas de Math.cos/sin,
// o que quebraria a hidratação.
const round = (n) => Math.round(n * 100) / 100

// Raios da marca (mesmo desenho do logo)
const RAYS = Array.from({ length: 24 }, (_, i) => {
  const angle = ((i * 15 - 90) * Math.PI) / 180
  return {
    x1: round(100 + Math.cos(angle) * 40),
    y1: round(100 + Math.sin(angle) * 40),
    x2: round(100 + Math.cos(angle) * 95),
    y2: round(100 + Math.sin(angle) * 95),
  }
})

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const close = () => setIsMenuOpen(false)

  return (
    <header className="header">
      <div className="container">
        <div className={`header-bar ${isMenuOpen ? 'header-bar--open' : ''}`}>
          <a href="#home" className="logo-link" onClick={close}>
            <svg className="header-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B3FD9" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              {RAYS.map((ray, i) => (
                <line
                  key={i}
                  {...ray}
                  stroke="url(#headerLogoGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity={0.8}
                />
              ))}
            </svg>
            <span className="logo-text">VYSIONIS</span>
          </a>

          <nav id="site-nav" className="nav" aria-label="Principal">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={close}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="nav-contact" onClick={close}>
              Contato
            </a>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a href="#contact" className="btn btn-primary nav-cta" onClick={close}>
              Contato
            </a>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="site-nav"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
