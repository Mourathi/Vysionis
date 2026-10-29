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
    // A tela "ativa" é a última cujo topo já passou do meio da janela
    // (assim o rodapé conta como a última tela, mesmo pulando direto até ele)
    const sections = SCREENS.map(({ id }) => document.getElementById(id)).filter(Boolean)
    let frame = 0

    const update = () => {
      frame = 0
      const middle = window.innerHeight / 2
      let current = sections[0]
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= middle) current = el
      }
      if (current) setActive(current.id)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
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
