import React from 'react'
import './About.css'
import SectionHead from './SectionHead'
import { InnovationIcon, TargetIcon, RocketIcon } from './Icons'

const values = [
  { icon: InnovationIcon, title: 'Tecnologia atual', text: 'Stack moderno e comprovado.' },
  { icon: TargetIcon, title: 'Feito sob medida', text: 'O sistema se adapta ao processo.' },
  { icon: RocketIcon, title: 'Pronto para escalar', text: 'Cresce junto com o negócio.', wide: true },
]

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="bento bento--m2">
          <SectionHead
            className="w-2 h-2 tile--ink"
            num="01"
            label="Sobre"
            title={<>Do escopo<br />à operação.</>}
            text="Projetamos, desenvolvemos e mantemos."
          />

          {values.map((value) => {
            const IconComponent = value.icon
            return (
              <article
                key={value.title}
                className={`tile tile-hover about-card ${value.wide ? 'w-2 about-card--wide' : ''}`}
              >
                <span className="about-icon">
                  <IconComponent className="icon-svg" />
                </span>
                <div className="tile-bottom">
                  <h3 className="display about-title">{value.title}</h3>
                  <p className="tile-text">{value.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
