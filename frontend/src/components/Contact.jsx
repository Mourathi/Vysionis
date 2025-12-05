import React, { useState } from 'react'
import './Contact.css'
import { EmailIcon, PhoneIcon, LocationIcon } from './Icons'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você conecta com seu backend depois
    console.log('Form submitted:', formData)
    alert('Mensagem enviada! Entraremos em contato em breve.')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Entre em Contato</h2>
        <p className="section-subtitle">
          Vamos conversar sobre seu próximo projeto
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <EmailIcon className="icon-svg" />
              </div>
              <h3>Email</h3>
              <p>contato@vysionis.com.br</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <PhoneIcon className="icon-svg" />
              </div>
              <h3>WhatsApp</h3>
              <p>+55 (11) 99999-9999</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <LocationIcon className="icon-svg" />
              </div>
              <h3>Localização</h3>
              <p>São Paulo, SP - Brasil</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <input
              type="text"
              name="company"
              placeholder="Empresa (opcional)"
              value={formData.company}
              onChange={handleChange}
            />
            
            <textarea
              name="message"
              placeholder="Conte-nos sobre seu projeto"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            
            <button type="submit" className="btn btn-primary">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
