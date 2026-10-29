import React from 'react'

/** Bloco de abertura de seção: número + rótulo no topo, título gigante na base. */
function SectionHead({ num, label, title, text, className = '' }) {
  return (
    <div className={`tile ${className}`}>
      <span className="tile-label">
        <span className="tile-label-num">{num}</span> / {label}
      </span>
      <h2 className="display section-title">{title}</h2>
      {text ? <p className="tile-text">{text}</p> : null}
    </div>
  )
}

export default SectionHead
