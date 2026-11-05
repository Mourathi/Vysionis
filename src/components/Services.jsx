import React from 'react'
import './Services.css'
import SectionHead from './SectionHead'
import { WebIcon, MobileIcon, ApiIcon, DatabaseIcon, CloudIcon, DesignIcon } from './Icons'

// Cada serviço dito pelo que resolve na empresa; a tecnologia fica nas etiquetas
const services = [
  {
    icon: DatabaseIcon,
    title: 'Sistema de gestão',
    text: 'Cadastros, pedidos, estoque, financeiro e relatórios num lugar só, com permissão para cada pessoa da equipe.',
    tags: ['Web'],
    className: '',
  },
  {
    icon: MobileIcon,
    title: 'App no celular',
    text: 'Para a equipe na rua ou para o seu cliente: pedidos, agendamentos, avisos e fotos, direto no celular.',
    tags: ['Android', 'iPhone'],
    className: 'tile--gradient',
  },
  {
    icon: WebIcon,
    title: 'Portal do cliente',
    text: 'Seu cliente acompanha o pedido, envia documentos e tira dúvidas sem precisar ligar.',
    tags: ['Web'],
    className: 'tile--ink',
  },
  {
    icon: ApiIcon,
    title: 'Integrações e automações',
    text: 'Ligamos o sistema ao que vocês já usam, como planilhas, e-mail e equipamentos, e automatizamos o que é repetido.',
    tags: ['APIs'],
    className: '',
  },
  {
    icon: DesignIcon,
    title: 'Telas fáceis de usar',
    text: 'Desenhadas para quem vai usar todo dia, inclusive quem não é bom de computador.',
    tags: ['UI/UX'],
    className: '',
  },
  {
    icon: CloudIcon,
    title: 'No ar e bem cuidado',
    text: 'Colocamos o sistema no ar e seguimos cuidando: correções, melhorias e segurança.',
    tags: ['Cloud'],
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
            num="02"
            label="O que fazemos"
            title={<>Do problema<br />ao sistema no ar.</>}
            text="Começamos pelo que mais atrapalha a sua operação hoje."
          />

          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <article key={service.title} className={`tile tile-hover service-card ${service.className}`}>
                <span className="service-icon">
                  <IconComponent className="icon-svg" />
                </span>
                <div className="tile-bottom">
                  <h3 className="tile-title">{service.title}</h3>
                  <p className="tile-text service-text">{service.text}</p>
                  <ul className="tag-list service-tags">
                    {service.tags.map((tag) => (
                      <li key={tag} className="tag">{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
