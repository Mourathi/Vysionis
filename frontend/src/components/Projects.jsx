import React from 'react'
import './Projects.css'

function Projects() {
  const projects = [
    {
      title: 'Sistema Predial',
      description: 'Plataforma completa para gestão de condomínios com controle de encomendas, entrada/saída, reservas e muito mais',
      tags: ['React', 'Python', 'PostgreSQL'],
      status: 'Em Desenvolvimento'
    },
    {
      title: 'Sistema Corporativo',
      description: 'Soluções empresariais customizadas para otimização de processos internos',
      tags: ['FastAPI', 'Flutter', 'MongoDB'],
      status: 'Planejamento'
    },
    {
      title: 'Automação Industrial',
      description: 'Sistemas de automação e monitoramento para indústrias 4.0',
      tags: ['IoT', 'Python', 'React'],
      status: 'Planejamento'
    }
  ]

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">Nossos Projetos</h2>
        <p className="section-subtitle">
          Conheça algumas das soluções que estamos desenvolvendo
        </p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-status">{project.status}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
