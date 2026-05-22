import React, { useId, useState } from 'react'
import './Contact.css'
import { EmailIcon, PhoneIcon, LocationIcon } from './Icons'

const EMAIL = 'contato@vysionis.com.br'
const PHONE_DISPLAY = '+55 (11) 96580-4957'
const WHATSAPP_HREF = 'https://wa.me/5511965804957'
const MAPS_HREF =
  'https://www.google.com/maps/search/?api=1&query=S%C3%A3o+Paulo%2C+SP%2C+Brasil'

function Contact() {
  const formId = useId()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('idle')

  const resetForm = () => {
    setFormData({ name: '', email: '', company: '', message: '' })
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
      <div className="contact-bg" aria-hidden />
      <div className="container contact-inner">
        <div className="contact-header">
          <p className="contact-eyebrow">Fale com a gente</p>
          <h2 className="section-title contact-title">Entre em contato</h2>
          <p className="section-subtitle contact-subtitle">
            Orçamento, dúvidas ou parcerias — respondemos em até um dia útil.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-aside">
            <p className="contact-aside-lead">
              Prefere outro canal? Escolha abaixo ou preencha o formulário.
            </p>
            <div className="contact-channels">
              <a className="contact-channel" href={`mailto:${EMAIL}`}>
                <span className="contact-channel-icon" aria-hidden>
                  <EmailIcon className="icon-svg" />
                </span>
                <span className="contact-channel-body">
                  <span className="contact-channel-label">Email</span>
                  <span className="contact-channel-value">{EMAIL}</span>
                </span>
                <span className="contact-channel-arrow" aria-hidden>
                  →
                </span>
              </a>

              <a
                className="contact-channel"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel-icon" aria-hidden>
                  <PhoneIcon className="icon-svg" />
                </span>
                <span className="contact-channel-body">
                  <span className="contact-channel-label">WhatsApp</span>
                  <span className="contact-channel-value">{PHONE_DISPLAY}</span>
                </span>
                <span className="contact-channel-arrow" aria-hidden>
                  →
                </span>
              </a>

              <a
                className="contact-channel"
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel-icon" aria-hidden>
                  <LocationIcon className="icon-svg" />
                </span>
                <span className="contact-channel-body">
                  <span className="contact-channel-label">Localização</span>
                  <span className="contact-channel-value">São Paulo, SP — Brasil</span>
                </span>
                <span className="contact-channel-arrow" aria-hidden>
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="contact-form-shell">
            <div className="contact-form-glow" aria-hidden />

            <div className="contact-form-card">
              <h3 className="contact-form-heading">Envie uma mensagem</h3>
              <p className="contact-form-hint">
                Os campos marcados com <span className="contact-required-mark">*</span> são
                obrigatórios.
              </p>

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

                <div className="contact-field">
                  <label htmlFor={`${formId}-company`}>Empresa</label>
                  <input
                    id={`${formId}-company`}
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Opcional"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor={`${formId}-message`}>
                    Projeto ou mensagem <span className="contact-required-mark">*</span>
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={5}
                    placeholder="Conte escopo, prazo desejado ou dúvidas — quanto mais contexto, melhor."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form-actions">
                  <button type="submit" className="btn btn-primary contact-submit">
                    Enviar mensagem
                  </button>
                  <a className="contact-wa-cta" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                    Abrir WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
