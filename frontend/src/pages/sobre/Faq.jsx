import React, { useState } from 'react';
import './faq.css';

const perguntas = [
  {
    pergunta: 'Preciso trocar minhas câmeras para usar o sistema?',
    resposta: 'Não! Nosso sistema é compatível com a maioria das câmeras IP já existentes, inclusive modelos populares da Intelbras.',
  },
  {
    pergunta: 'O sistema funciona em tempo real?',
    resposta: 'Sim. As detecções e contagens são exibidas no dashboard quase instantaneamente, com mínimo delay.',
  },
  {
    pergunta: 'Consigo saber quem está atendendo cada cliente?',
    resposta: 'Sim. Utilizamos reconhecimento facial e lógica de proximidade para identificar automaticamente os atendimentos.',
  },
  {
    pergunta: 'É possível integrar o sistema com meu ERP ou CRM?',
    resposta: 'Sim, oferecemos API REST que permite integração com ferramentas externas mediante análise técnica.',
  },
];

export default function Faq() {
  const [aberta, setAberta] = useState(null);

  const toggle = (index) => {
    setAberta(aberta === index ? null : index);
  };

  return (
    <section className='faq'>
      <div className='container'>
        <h2>Perguntas Frequentes</h2>
        <div className='faq-list'>
          {perguntas.map((item, index) => (
            <div key={index} className={`faq-item ${aberta === index ? 'ativa' : ''}`}>
              <button onClick={() => toggle(index)} className='faq-pergunta'>
                {item.pergunta}
                <span className='seta'>{aberta === index ? '−' : '+'}</span>
              </button>
              <div className={`faq-resposta ${aberta === index ? 'aberta' : ''}`}>
                <div className='faq-conteudo'>{item.resposta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
