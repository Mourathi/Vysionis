import React, { useId, useState } from 'react'
import './Contact.css'
import SectionHead from './SectionHead'
import { EmailIcon } from './Icons'

const EMAIL = 'contato@vysionis.com.br'
const PHONE_DISPLAY = '+55 (11) 96580-4957'
const WHATSAPP_HREF = 'https://wa.me/5511965804957'

function Contact() {
  const formId = useId()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('idle')

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('success')
    resetForm()
  }

  const handleChange = (e) => {
    if (formStatus === 'success') setFormStatus('idle')
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="bento bento--m2">
          <SectionHead
            className="w-2 tile--ink"
            num="05"
            label="Contato"
            title={<>Vamos<br />conversar.</>}
            text="Respondemos em até um dia útil."
          />

          <div className="tile w-2 h-2 contact-form-card">
            <h3 className="tile-title">Envie uma mensagem</h3>

            <form className="contact-form" id={formId} onSubmit={handleSubmit}>
              {formStatus === 'success' ? (
                <div className="contact-form-success" role="status">
                  <span className="contact-form-success-title">Mensagem registrada.</span>
                  <span className="contact-form-success-text">
                    Em breve integramos o envio ao servidor. Por enquanto, use o email ou o
                    WhatsApp ao lado para uma resposta imediata.
                  </span>
                </div>
              ) : null}

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor={`${formId}-name`}>
                    Nome <span className="contact-required-mark">*</span>
                  </label>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Como podemos te chamar"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor={`${formId}-email`}>
                    Email <span className="contact-required-mark">*</span>
                  </label>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field contact-field--grow">
                <label htmlFor={`${formId}-message`}>
                  Projeto ou mensagem <span className="contact-required-mark">*</span>
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  placeholder="Conte um pouco do projeto"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary contact-submit">
                Enviar mensagem
              </button>
            </form>
          </div>

          <a className="tile contact-channel" href={`mailto:${EMAIL}`}>
            <span className="contact-channel-icon" aria-hidden="true">
              <EmailIcon className="icon-svg" />
            </span>
            <span className="tile-bottom contact-channel-foot">
              <span>
                <span className="tile-label">Email</span>
                <span className="contact-channel-value">{EMAIL}</span>
              </span>
              <span className="tile-arrow" aria-hidden="true">→</span>
            </span>
          </a>

          <a
            className="tile tile--accent contact-channel"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="display contact-channel-big">WhatsApp</span>
            <span className="tile-bottom contact-channel-foot">
              <span>
                <span className="tile-label">Resposta rápida</span>
                <span className="contact-channel-value">{PHONE_DISPLAY}</span>
              </span>
              <span className="tile-arrow" aria-hidden="true">→</span>
            </span>
          </a>

        </div>
      </div>
    </section>
  )
}

export default Contact
