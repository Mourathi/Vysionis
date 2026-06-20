import React from 'react'
import './Services.css'
import { WebIcon, MobileIcon, ApiIcon, DatabaseIcon, CloudIcon, DesignIcon } from './Icons'

function Services() {
  const services = [
    {
      icon: WebIcon,
      title: 'Desenvolvimento Web',
      description: 'Aplicações web rápidas e responsivas com React e tecnologias modernas.',
    },
    {
      icon: MobileIcon,
      title: 'Aplicativos Mobile',
      description: 'Apps nativos e cross-platform com Flutter e React Native, para iOS e Android.',
    },
    {
      icon: ApiIcon,
      title: 'APIs e Back-end',
      description: 'APIs robustas e escaláveis com Python, FastAPI e Node.js.',
    },
    {
      icon: DatabaseIcon,
      title: 'Banco de Dados',
      description: 'Modelagem e otimização de bancos SQL e NoSQL para máxima eficiência.',
    },
    {
      icon: CloudIcon,
      title: 'Cloud & DevOps',
      description: 'Deploy, CI/CD e infraestrutura em nuvem na AWS, Azure e Google Cloud.',
    },
    {
      icon: DesignIcon,
      title: 'UI/UX Design',
      description: 'Interfaces claras e objetivas, focadas na experiência de quem usa.',
    },
  ]

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-head">
          <span className="section-index">
            <span className="section-index-num">03</span>
            <span className="section-index-label">Serviços</span>
          </span>
          <div>
            <h2 className="section-title">O que fazemos.</h2>
            <p className="section-subtitle">
              Do design à infraestrutura: cobrimos todo o ciclo de desenvolvimento de um sistema.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <article key={index} className="service-card">
                <span className="service-icon">
                  <IconComponent className="icon-svg" />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
