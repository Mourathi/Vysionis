import React from 'react'
import './Projects.css'

const projects = [
  {
    title: 'Trinco',
    description: 'Sistema de portaria para condomínios: entradas, encomendas, visitas e reservas.',
    tags: ['React', 'TypeScript', 'Supabase'],
    status: 'Disponível',
    tone: 'tile--ink',
    // Página do produto, com a apresentação completa
    href: '/trinco/',
    chamada: 'Conhecer o Trinco',
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

/** Galeria de projetos: presa na tela, os cards passam de lado conforme a rolagem
 *  (o script do Layout liga .projects--presa; sem ele, os cards ficam em grade). */
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

          {projects.map((project, index) => {
            // Projeto com página própria vira link (o card inteiro é clicável)
            const Card = project.href ? 'a' : 'article'
            return (
              <Card
                key={project.title}
                href={project.href}
                className={`tile project-slide ${project.tone}`}
              >
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
                  {project.chamada && (
                    <span className="project-link">
                      {project.chamada}
                      <span className="tile-arrow" aria-hidden="true">→</span>
                    </span>
                  )}
                </div>
              </Card>
            )
          })}

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
