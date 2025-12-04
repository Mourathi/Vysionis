import React from 'react'
import './Services.css'

function Services() {
  const services = [
    {
      icon: '💻',
      title: 'Desenvolvimento Web',
      description: 'Aplicações web modernas, responsivas e de alta performance usando React, Vue.js e tecnologias de ponta'
    },
    {
      icon: '📱',
      title: 'Aplicativos Mobile',
      description: 'Apps nativos e cross-platform com Flutter e React Native para iOS e Android'
    },
    {
      icon: '🔧',
      title: 'APIs e Backend',
      description: 'APIs RESTful robustas e escaláveis com Python, FastAPI e Node.js'
    },
    {
      icon: '🗄️',
      title: 'Banco de Dados',
      description: 'Modelagem e otimização de bancos SQL e NoSQL para máxima eficiência'
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'Deploy, CI/CD e infraestrutura em nuvem (AWS, Azure, Google Cloud)'
    },
    {
      icon: '🎨',
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
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
