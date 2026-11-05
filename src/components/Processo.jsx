import React from 'react'
import './Processo.css'
import SectionHead from './SectionHead'

const etapas = [
  {
    titulo: 'Diagnóstico grátis',
    texto: '30 minutos de conversa para entender a operação e o que mais atrapalha hoje. Sem compromisso.',
  },
  {
    titulo: 'Proposta com preço fechado',
    texto: 'Escopo, prazo e valor por escrito, em poucos dias. Sem surpresa no meio do caminho.',
  },
  {
    titulo: 'Você vê funcionando',
    texto: 'Entregamos por etapas: em cada uma, você testa o sistema de verdade e pede ajustes.',
  },
  {
    titulo: 'No ar e com suporte',
    texto: 'Colocamos no ar, orientamos a equipe e seguimos cuidando do sistema.',
  },
]

/** Como funciona: as quatro etapas, ligadas por uma linha que se completa ao rolar */
function Processo() {
  return (
    <section id="processo" className="section processo">
      <div className="container">
        <div className="bento bento--m2">
          <SectionHead
            className="w-2 h-2 tile--gradient"
            num="04"
            label="Como funciona"
            title={<>Do primeiro papo<br />ao sistema no ar.</>}
            text="Você sabe o preço e o prazo antes de começar."
          />

          {etapas.map((etapa, i) => (
            <article key={etapa.titulo} className="tile etapa" data-reveal style={{ '--n': i }}>
              <span className="etapa-passo" aria-hidden="true">
                <span className="etapa-num">{i + 1}</span>
                <span className="etapa-linha" />
              </span>
              <div className="tile-bottom">
                <h3 className="tile-title etapa-titulo">{etapa.titulo}</h3>
                <p className="tile-text">{etapa.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Processo
