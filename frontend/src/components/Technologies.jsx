import React from 'react'
import './Technologies.css'

function Technologies() {
  const techs = [
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Linguagem' },
    { name: 'Python', category: 'Backend' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'React Native', category: 'Mobile' },
    { name: 'PostgreSQL', category: 'Banco de dados' },
    { name: 'MongoDB', category: 'Banco de dados' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
  ]

  return (
    <section id="technologies" className="section technologies">
      <div className="container">
        <div className="section-head">
          <span className="section-index">
            <span className="section-index-num">04</span>
            <span className="section-index-label">Stack</span>
          </span>
          <div>
            <h2 className="section-title">Tecnologias que usamos.</h2>
            <p className="section-subtitle">
              Ferramentas escolhidas pela confiabilidade e pela comunidade — não pela moda.
            </p>
          </div>
        </div>

        <ul className="tech-grid">
          {techs.map((tech, index) => (
            <li key={index} className="tech-card">
              <span className="tech-name">{tech.name}</span>
              <span className="tech-category">{tech.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Technologies
