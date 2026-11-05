import React from 'react'
import './Footer.css'

const columns = [
  {
    title: 'Empresa',
    links: [
      { label: 'Para quem é', href: '#para-quem' },
      { label: 'Serviços', href: '#services' },
      { label: 'Caso real', href: '#projects' },
      { label: 'Como funciona', href: '#processo' },
    ],
  },
  {
    title: 'Produtos',
    links: [{ label: 'Trinco', href: '/trinco/' }],
  },
  {
    title: 'Contato',
    links: [
      { label: 'Email', href: 'mailto:contato@vysionis.com.br' },
      { label: 'WhatsApp', href: 'https://wa.me/5511965804957', external: true },
      { label: 'Diagnóstico grátis', href: '#contact' },
    ],
  },
  // Redes sociais: entram aqui quando os perfis estiverem no ar (link "#" parece site inacabado)
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="tile tile--ink footer-tile">
          <div className="footer-top">
            <p className="footer-tagline">
              Software sob medida para empresas.
              <br />
              São Paulo, Brasil.
            </p>

            <nav className="footer-links" aria-label="Rodapé">
              {columns.map((column) => (
                <div key={column.title} className="footer-column">
                  <span className="tile-label">{column.title}</span>
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          <p className="display footer-wordmark" aria-hidden="true">Vysionis</p>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Vysionis. Todos os direitos reservados.</span>
            <a href="#home">Voltar ao topo ↑</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
