import React from 'react'
import './Band.css'

/** Faixa de texto gigante que corre para o lado conforme a rolagem (decorativa). */
function Band({ items, reverse = false }) {
  // Repetida para nunca faltar texto nas bordas durante o deslocamento
  const repeated = [...items, ...items, ...items]

  return (
    <div className={`band ${reverse ? 'band--reverse' : ''}`} aria-hidden="true">
      <div className="band-track">
        {repeated.map((item, i) => (
          <span key={i} className={`display band-item ${i % 2 ? 'band-item--outline' : ''}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Band
