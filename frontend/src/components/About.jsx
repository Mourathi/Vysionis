import React from 'react'
import './About.css'

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">Sobre a Vysionis</h2>
        <p className="section-subtitle">
          Somos uma empresa especializada em desenvolvimento de software sob medida
        </p>
        
        <div className="about-content">
          <div className="about-card">
            <div className="card-icon">⚡</div>
            <h3>Inovação</h3>
            <p>Utilizamos as tecnologias mais modernas e eficientes do mercado para entregar soluções de alta performance</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">🎯</div>
            <h3>Personalização</h3>
            <p>Cada projeto é único. Desenvolvemos sistemas totalmente customizados para atender suas necessidades específicas</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">🚀</div>
            <h3>Escalabilidade</h3>
            <p>Nossos sistemas são projetados para crescer junto com seu negócio, garantindo performance e estabilidade</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
