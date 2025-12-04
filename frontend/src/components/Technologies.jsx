import React from 'react'
import './Technologies.css'

function Technologies() {
  const techs = [
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Python', category: 'Backend' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'React Native', category: 'Mobile' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
  ]

  return (
    <section id="technologies" className="section technologies">
      <div className="container">
        <h2 className="section-title">Tecnologias</h2>
        <p className="section-subtitle">
          Trabalhamos com as melhores tecnologias do mercado
        </p>
        
        <div className="tech-grid">
          {techs.map((tech, index) => (
            <div key={index} className="tech-card">
              <div className="tech-name">{tech.name}</div>
              <div className="tech-category">{tech.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies
