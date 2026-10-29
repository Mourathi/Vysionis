import React from 'react'
import './About.css'
import { InnovationIcon, TargetIcon, RocketIcon } from './Icons'

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head">
          <span className="section-index">
            <span className="section-index-num">01</span>
            <span className="section-index-label">Sobre</span>
          </span>
          <div>
            <h2 className="section-title">Software sob medida, do escopo à operação.</h2>
            <p className="section-subtitle">
              Somos um estúdio especializado em sistemas customizados. Projetamos, desenvolvemos e
              mantemos cada solução conforme a necessidade real do seu negócio.
            </p>
          </div>
        </div>

        <div className="about-grid">
          <article className="about-card">
            <span className="about-card-icon">
              <InnovationIcon className="icon-svg" />
            </span>
            <h3>Tecnologia atual</h3>
            <p>
              Trabalhamos com um stack moderno e comprovado para entregar sistemas rápidos,
              seguros e fáceis de manter.
            </p>
          </article>

          <article className="about-card">
            <span className="about-card-icon">
              <TargetIcon className="icon-svg" />
            </span>
            <h3>Feito sob medida</h3>
            <p>
              Cada projeto parte da sua operação. Nada de pacote fechado — o sistema se adapta ao
              processo, não o contrário.
            </p>
          </article>

          <article className="about-card">
            <span className="about-card-icon">
              <RocketIcon className="icon-svg" />
            </span>
            <h3>Pronto para escalar</h3>
            <p>
              Arquitetura pensada para crescer junto com o negócio, mantendo desempenho e
              estabilidade ao longo do tempo.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
