import React from 'react'
import './Services.css'
import SectionHead from './SectionHead'
import { WebIcon, MobileIcon, ApiIcon, DatabaseIcon, CloudIcon, DesignIcon } from './Icons'

const services = [
  {
    icon: WebIcon,
    title: 'Sistemas Web',
    className: '',
  },
  {
    icon: MobileIcon,
    title: 'Apps Mobile',
    className: 'tile--gradient',
  },
  {
    icon: ApiIcon,
    title: 'APIs e Back-end',
    className: 'tile--ink',
  },
  {
    icon: DatabaseIcon,
    title: 'Banco de Dados',
    className: '',
  },
  {
    icon: CloudIcon,
    title: 'Cloud & DevOps',
    className: '',
  },
  {
    icon: DesignIcon,
    title: 'UI/UX Design',
    className: '',
  },
]

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="bento bento--m2">
          <SectionHead
            className="w-2"
            num="03"
            label="Serviços"
            title={<>O que<br />fazemos.</>}
            text="Do design à infraestrutura."
          />

          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <article key={service.title} className={`tile tile-hover service-card ${service.className}`}>
                <span className="service-icon">
                  <IconComponent className="icon-svg" />
                </span>
                <h3 className="tile-title tile-bottom">{service.title}</h3>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
