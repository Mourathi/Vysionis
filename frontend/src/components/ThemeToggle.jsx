import React, { useEffect, useState } from 'react'
import './ThemeToggle.css'

const STORAGE_KEY = 'vysionis-theme'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/** Alterna entre tema claro (padrão) e escuro, persistindo a escolha. */
function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTheme(getInitialTheme())
  }, [])

  const applyTheme = (next) => {
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* localStorage indisponível — ignora */
    }
  }

  const toggle = () => applyTheme(theme === 'dark' ? 'light' : 'dark')

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
      // evita "piscar" o ícone errado antes da hidratação
      style={{ visibility: mounted ? 'visible' : 'hidden' }}
    >
      {isDark ? (
        /* Sol — clique leva ao modo claro */
        <svg className="theme-toggle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="12" y1="2.5" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="21.5" />
            <line x1="2.5" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="21.5" y2="12" />
            <line x1="5.1" y1="5.1" x2="6.9" y2="6.9" />
            <line x1="17.1" y1="17.1" x2="18.9" y2="18.9" />
            <line x1="5.1" y1="18.9" x2="6.9" y2="17.1" />
            <line x1="17.1" y1="6.9" x2="18.9" y2="5.1" />
          </g>
        </svg>
      ) : (
        /* Lua — clique leva ao modo escuro */
        <svg className="theme-toggle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M20 14.2A8 8 0 0 1 9.8 4a0.5 0.5 0 0 0-.66-.61A9 9 0 1 0 20.6 14.86 0.5 0.5 0 0 0 20 14.2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
