import React, { useEffect, useState } from 'react'
import './ScreenNav.css'

const SCREENS = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'projects', label: 'Projetos' },
  { id: 'services', label: 'Serviços' },
  { id: 'technologies', label: 'Stack' },
  { id: 'contact', label: 'Contato' },
]

/** Indicador lateral de telas: mostra onde a pessoa está e permite pular entre telas. */
function ScreenNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    // A tela "ativa" é a que cruza o meio da janela
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    SCREENS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const index = SCREENS.findIndex((s) => s.id === active)

  return (
    <nav className="screen-nav" aria-label="Telas">
      <span className="screen-nav-count" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
        <span>/{String(SCREENS.length).padStart(2, '0')}</span>
      </span>
      <ol>
        {SCREENS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={id === active ? 'is-active' : undefined}
              aria-current={id === active ? 'true' : undefined}
            >
              <span className="screen-nav-label">{label}</span>
              <span className="screen-nav-dot" aria-hidden="true"></span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default ScreenNav
