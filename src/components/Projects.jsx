import React from 'react'
import './Projects.css'

// Caso real contado em três passos: o problema, o que fizemos e como ficou
const passos = [
  {
    rotulo: 'O problema',
    titulo: 'Portaria no caderno',
    texto: 'Encomenda sem dono, visita sem aviso e passagem de turno de boca. Tudo anotado à mão, sem histórico.',
    tone: 'tile--ink',
  },
  {
    rotulo: 'O que fizemos',
    titulo: 'Trinco',
    texto: 'Um sistema de portaria no navegador: entradas com foto, encomendas e visitas com aviso no celular do morador, câmeras ao vivo e livro da portaria.',
    tags: ['React', 'TypeScript', 'Supabase'],
    tone: '',
  },
  {
    rotulo: 'Como ficou',
    titulo: 'Fácil para quem usa',
    texto: 'Modo Fácil para o porteiro, painel para o síndico e celular para o morador. LGPD resolvida e dados guardados no Brasil.',
    tone: 'tile--accent',
  },
]

/** Caso real em galeria: presa na tela, os cards passam de lado conforme a rolagem
 *  (o script do Layout liga .projects--presa; sem ele, os cards ficam em grade). */
function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-sticky">
        <div className="projects-track">
          <div className="tile project-slide project-slide--head">
            <span className="tile-label">
              <span className="tile-label-num">03</span> / Caso real
            </span>
            <h2 className="display section-title projects-title">
              Um sistema nosso, no ar.
            </h2>
            <span className="projects-hint" aria-hidden="true">
              Continue rolando →
            </span>
          </div>

          {passos.map((passo, index) => (
            <article key={passo.titulo} className={`tile project-slide ${passo.tone}`}>
              <span className="project-num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="project-status">{passo.rotulo}</span>
              <div className="tile-bottom">
                <h3 className="display project-title">{passo.titulo}</h3>
                <p className="tile-text">{passo.texto}</p>
                {passo.tags && (
                  <ul className="tag-list project-tags">
                    {passo.tags.map((tag) => (
                      <li key={tag} className="tag">{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}

          <a href="/trinco/" className="tile tile--ink project-slide project-cta">
            <span className="tile-label">Veja por dentro</span>
            <div className="tile-bottom project-cta-foot">
              <span className="display project-cta-title">Conhecer o Trinco</span>
              <span className="tile-arrow" aria-hidden="true">→</span>
            </div>
          </a>

          <a href="#contact" className="tile tile--gradient project-slide project-cta">
            <span className="tile-label">Próximo</span>
            <div className="tile-bottom project-cta-foot">
              <span className="display project-cta-title">O próximo pode ser o seu</span>
              <span className="tile-arrow" aria-hidden="true">→</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
