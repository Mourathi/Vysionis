import React, { useId, useState } from 'react'
import './Contact.css'
import SectionHead from './SectionHead'
import { EmailIcon } from './Icons'
import { EMAIL, TELEFONE, WHATSAPP_DIAGNOSTICO, linkWhatsApp } from './contato'

/** Texto que chega no WhatsApp da Vysionis, montado com o que a pessoa escreveu */
function montarMensagem({ nome, empresa, mensagem }) {
  const quem = empresa.trim() ? `${nome.trim()}, da ${empresa.trim()}` : nome.trim()
  return `Olá! Sou ${quem} e quero agendar o diagnóstico gratuito.\n\n${mensagem.trim()}`
}

function Contact() {
  const formId = useId()
  const [formData, setFormData] = useState({ nome: '', empresa: '', mensagem: '' })
  // Link do WhatsApp aberto por último (para quem estiver com o navegador bloqueando a janela)
  const [aberto, setAberto] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = linkWhatsApp(montarMensagem(formData))
    setAberto(url)
    // Abre numa aba nova (sem "noopener" nos parâmetros: com ele o open devolve null
    // sempre e a página também navegaria). Bloqueado? Vai na mesma aba.
    const janela = window.open(url, '_blank')
    if (janela) janela.opener = null
    else window.location.href = url
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="bento bento--m2">
          <SectionHead
            className="w-2 tile--ink"
            num="07"
            label="Contato"
            title={<>Agende o<br />diagnóstico grátis.</>}
            text="30 minutos para entender a sua operação. Sem compromisso."
          />

          <div className="tile w-2 h-2 contact-form-card">
            <h3 className="tile-title">Conte o que você quer resolver</h3>

            <form className="contact-form" id={formId} onSubmit={handleSubmit}>
              {aberto ? (
                <div className="contact-form-success" role="status">
                  <span className="contact-form-success-title">Abrimos o WhatsApp com a sua mensagem.</span>
                  <span className="contact-form-success-text">
                    É só apertar enviar por lá. Não abriu?{' '}
                    <a href={aberto} target="_blank" rel="noopener noreferrer">Abrir o WhatsApp</a>
                  </span>
                </div>
              ) : null}

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor={`${formId}-nome`}>
                    Nome <span className="contact-required-mark">*</span>
                  </label>
                  <input
                    id={`${formId}-nome`}
                    type="text"
                    name="nome"
                    autoComplete="name"
                    placeholder="Como podemos te chamar"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor={`${formId}-empresa`}>Empresa</label>
                  <input
                    id={`${formId}-empresa`}
                    type="text"
                    name="empresa"
                    autoComplete="organization"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-field contact-field--grow">
                <label htmlFor={`${formId}-mensagem`}>
                  O que mais atrapalha hoje? <span className="contact-required-mark">*</span>
                </label>
                <textarea
                  id={`${formId}-mensagem`}
                  name="mensagem"
                  rows={4}
                  placeholder="Ex.: controlamos os pedidos numa planilha e sempre some alguma coisa"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary contact-submit">
                Continuar no WhatsApp
              </button>
              <p className="contact-nota">A mensagem abre pronta no WhatsApp. Você revisa e envia.</p>
            </form>
          </div>

          <a className="tile contact-channel" href={`mailto:${EMAIL}`}>
            <span className="contact-channel-icon" aria-hidden="true">
              <EmailIcon className="icon-svg" />
            </span>
            <span className="tile-bottom contact-channel-foot">
              <span>
                <span className="tile-label">Prefere e-mail?</span>
                <span className="contact-channel-value">{EMAIL}</span>
              </span>
              <span className="tile-arrow" aria-hidden="true">→</span>
            </span>
          </a>

          <a
            className="tile tile--accent contact-channel"
            href={WHATSAPP_DIAGNOSTICO}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="display contact-channel-big">WhatsApp</span>
            <span className="tile-bottom contact-channel-foot">
              <span>
                <span className="tile-label">Resposta rápida</span>
                <span className="contact-channel-value">{TELEFONE}</span>
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
