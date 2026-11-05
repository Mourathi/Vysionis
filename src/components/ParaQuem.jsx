import React from 'react'
import './ParaQuem.css'
import SectionHead from './SectionHead'

// A empresa se reconhece na dor; a linha de baixo diz o que muda com o sistema
const dores = [
  {
    dor: 'A operação vive em planilhas que só uma pessoa entende.',
    solucao: 'Tudo num sistema só, com login para cada pessoa da equipe.',
  },
  {
    dor: 'Pedido, recado e aprovação se perdem no grupo de WhatsApp.',
    solucao: 'Cada pedido com responsável, prazo e histórico.',
  },
  {
    dor: 'O sistema pronto obriga vocês a trabalhar do jeito dele.',
    solucao: 'Um sistema que segue o processo de vocês.',
  },
  {
    dor: 'A mesma informação é digitada duas, três vezes.',
    solucao: 'Digitou uma vez, aparece onde precisa.',
  },
]

/** Para quem é: dores comuns, riscadas ao entrar na tela (data-reveal → .visible) */
function ParaQuem() {
  return (
    <section id="para-quem" className="section para-quem">
      <div className="container">
        <div className="bento bento--m2">
          <SectionHead
            className="w-2 h-2 tile--ink"
            num="01"
            label="Para quem é"
            title={<>Isso acontece<br />na sua empresa?</>}
            text="Se você se reconheceu em pelo menos um, um sistema sob medida resolve."
          />

          {dores.map((item, i) => (
            <article key={item.dor} className="tile dor" data-reveal style={{ '--n': i }}>
              <span className="dor-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="tile-bottom">
                <p className="dor-texto">{item.dor}</p>
                <p className="dor-solucao">
                  <span className="dor-check" aria-hidden="true">✓</span>
                  {item.solucao}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ParaQuem
