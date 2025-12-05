import React from 'react'
import './Services.css'
import { WebIcon, MobileIcon, ApiIcon, DatabaseIcon, CloudIcon, DesignIcon } from './Icons'

function Services() {
  const services = [
    {
      icon: WebIcon,
      title: 'Desenvolvimento Web',
      description: 'Aplicações web modernas, responsivas e de alta performance usando React, Vue.js e tecnologias de ponta'
    },
    {
      icon: MobileIcon,
      title: 'Aplicativos Mobile',
      description: 'Apps nativos e cross-platform com Flutter e React Native para iOS e Android'
    },
    {
      icon: ApiIcon,
      title: 'APIs e Backend',
      description: 'APIs RESTful robustas e escaláveis com Python, FastAPI e Node.js'
    },
    {
      icon: DatabaseIcon,
      title: 'Banco de Dados',
      description: 'Modelagem e otimização de bancos SQL e NoSQL para máxima eficiência'
    },
    {
      icon: CloudIcon,
      title: 'Cloud & DevOps',
      description: 'Deploy, CI/CD e infraestrutura em nuvem (AWS, Azure, Google Cloud)'
    },
    {
      icon: DesignIcon,
      title: 'UI/UX Design',
      description: 'Interfaces intuitivas e designs modernos focados em experiência do usuário'
    }
  ]

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">
          Oferecemos soluções completas de desenvolvimento de software
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <IconComponent className="icon-svg" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
