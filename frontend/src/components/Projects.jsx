import React from 'react'
import './Projects.css'

function Projects() {
  const projects = [
    {
      title: 'Sistema Predial',
      description:
        'Plataforma completa para gestão de condomínios: controle de encomendas, entrada e saída, reservas de áreas e comunicação com moradores.',
      tags: ['React', 'Python', 'PostgreSQL'],
      status: 'Em desenvolvimento',
    },
    {
      title: 'Sistema Corporativo',
      description:
        'Soluções empresariais customizadas para otimizar e integrar processos internos de ponta a ponta.',
      tags: ['FastAPI', 'React', 'Supabase'],
      status: 'Planejamento',
    },
    {
      title: 'Automação Industrial',
      description:
        'Monitoramento e automação para indústria 4.0, com coleta de dados em tempo real e painéis de controle.',
      tags: ['IoT', 'Python', 'React'],
      status: 'Planejamento',
    },
  ]

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head">
          <span className="section-index">
            <span className="section-index-num">02</span>
            <span className="section-index-label">Projetos</span>
          </span>
          <div>
            <h2 className="section-title">O que estamos construindo.</h2>
            <p className="section-subtitle">
              Uma amostra das soluções em que estamos trabalhando — de gestão predial a automação
              industrial.
            </p>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <span className="project-status">{project.status}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
