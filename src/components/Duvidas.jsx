import React from 'react'
import './Duvidas.css'
import SectionHead from './SectionHead'

const duvidas = [
  {
    p: 'Quanto custa um sistema sob medida?',
    r: 'Depende do tamanho do problema. Depois do diagnóstico gratuito, você recebe uma proposta com preço fechado e prazo, sem compromisso de fechar.',
  },
  {
    p: 'Quanto tempo leva?',
    r: 'O prazo vai por escrito na proposta. Começamos pelo que mais atrapalha a operação, para a equipe usar uma primeira parte o quanto antes.',
  },
  {
    p: 'Funciona no celular?',
    r: 'Sim. Os sistemas funcionam no navegador do computador e do celular, sem instalar nada. Quando faz sentido, também fazemos app para Android e iPhone.',
  },
  {
    p: 'E depois que fica pronto?',
    r: 'A gente continua por perto: correções, melhorias e hospedagem, combinadas na proposta.',
  },
  {
    p: 'Já usamos um sistema pronto. Vale a pena trocar?',
    r: 'Nem sempre. No diagnóstico a gente diz com sinceridade se o que vocês têm resolve, se dá para integrar ou se um sistema sob medida compensa.',
  },
]

/** Dúvidas de quem vai contratar (o <details> abre e fecha sem JS) */
function Duvidas() {
  return (
    <section id="duvidas" className="section duvidas">
      <div className="container">
        <div className="bento bento--m2">
          <SectionHead
            className="w-2 tile--ink"
            num="06"
            label="Dúvidas"
            title={<>Antes de<br />contratar.</>}
            text="As perguntas que mais ouvimos."
          />

          <div className="tile w-2 duvidas-lista">
            {duvidas.map((d) => (
              <details key={d.p} className="duvida">
                <summary>
                  <span>{d.p}</span>
                  <span className="duvida-sinal" aria-hidden="true" />
                </summary>
                <p>{d.r}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Duvidas
