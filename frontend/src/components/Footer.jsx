import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="gradient-text">VYSIONIS</h3>
            <p>Desenvolvendo o futuro, linha por linha.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Empresa</h4>
              <a href="#about">Sobre</a>
              <a href="#projects">Projetos</a>
              <a href="#services">Serviços</a>
            </div>
            
            <div className="footer-column">
              <h4>Contato</h4>
              <a href="mailto:contato@vysionis.com.br">Email</a>
              <a href="https://wa.me/5511999999999">WhatsApp</a>
              <a href="#contact">Formulário</a>
            </div>
            
            <div className="footer-column">
              <h4>Social</h4>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Vysionis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
