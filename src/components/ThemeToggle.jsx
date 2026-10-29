import React, { useSyncExternalStore } from 'react'
import './ThemeToggle.css'

const STORAGE_KEY = 'vysionis-theme'

// O tema vive em <html data-theme>, definido antes da pintura pelo script do Layout.
const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
const getTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
// No servidor o tema é desconhecido: null mantém o botão oculto até a hidratação.
const getServerTheme = () => null

/** Alterna entre tema claro (padrão) e escuro, persistindo a escolha. */
function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)
  const mounted = theme !== null

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* localStorage indisponível — ignora */
    }
  }

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
