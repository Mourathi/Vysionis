import React from 'react'
import './Technologies.css'

const techs = [
  'React',
  'Vue.js',
  'TypeScript',
  'Python',
  'FastAPI',
  'Node.js',
  'Flutter',
  'React Native',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'AWS',
]

// Três faixas de quatro nomes, alternando o sentido
const rows = [techs.slice(0, 4), techs.slice(4, 8), techs.slice(8)]

/** Faixa contínua: a lista é duplicada (cópia oculta) para o loop não ter emenda. */
function Marquee({ items, reverse }) {
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`}>
      {/* shift: empurrão extra guiado pela rolagem, somado ao letreiro contínuo */}
      <div className="marquee-shift">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? 'true' : undefined}>
              {items.map((name) => (
                <li key={name} className="display marquee-item">{name}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

function Technologies() {
  return (
    <section id="technologies" className="section technologies">
      <div className="container">
        <div className="bento">
          <div className="tile tile--gradient w-4 tech-tile">
            <span className="tile-label tech-label">
              <span className="tile-label-num">04</span> / Stack
            </span>
            <div className="tech-rows">
              {rows.map((items, i) => (
                <Marquee key={i} items={items} reverse={i % 2 === 1} />
              ))}
            </div>
            <h2 className="display tech-title">Confiabilidade, não moda.</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Technologies
