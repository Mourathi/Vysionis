import React from 'react'
import './Projects.css'

const projects = [
  {
    title: 'Sistema Predial',
    description: 'Gestão de condomínios: encomendas, acessos e reservas.',
    tags: ['React', 'Python', 'PostgreSQL'],
    status: 'Em desenvolvimento',
    tone: 'tile--ink',
  },
  {
    title: 'Sistema Corporativo',
    description: 'Processos internos integrados de ponta a ponta.',
    tags: ['FastAPI', 'React', 'Supabase'],
    status: 'Planejamento',
    tone: '',
  },
  {
    title: 'Automação Industrial',
    description: 'Monitoramento em tempo real para a indústria 4.0.',
    tags: ['IoT', 'Python', 'React'],
    status: 'Planejamento',
    tone: 'tile--accent',
  },
]

/** Galeria horizontal: a seção fica presa na tela e os cards passam de lado conforme a rolagem. */
function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-sticky">
        <div className="projects-track">
          <div className="tile project-slide project-slide--head">
            <span className="tile-label">
              <span className="tile-label-num">02</span> / Projetos
            </span>
            <h2 className="display section-title projects-title">
              O que estamos construindo.
            </h2>
            <span className="projects-hint" aria-hidden="true">
              Continue rolando →
            </span>
          </div>

          {projects.map((project, index) => (
            <article key={project.title} className={`tile project-slide ${project.tone}`}>
              <span className="project-num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="project-status">{project.status}</span>
              <div className="tile-bottom">
                <h3 className="display project-title">{project.title}</h3>
                <p className="tile-text">{project.description}</p>
                <ul className="tag-list project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <a href="#contact" className="tile tile--gradient project-slide project-cta">
            <span className="tile-label">Próximo</span>
            <div className="tile-bottom project-cta-foot">
              <span className="display project-cta-title">Seu projeto aqui</span>
              <span className="tile-arrow" aria-hidden="true">→</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
