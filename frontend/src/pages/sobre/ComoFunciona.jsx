import React from 'react';
import './comoFunciona.css';

const passos = [
  {
    titulo: '1. Câmeras conectadas',
    descricao: 'Integramos câmeras de segurança comuns ao sistema, sem necessidade de trocas caras.',
    icone: '📷',
  },
  {
    titulo: '2. Detecção inteligente',
    descricao: 'Identificamos atendentes e clientes em tempo real com algoritmos de visão computacional.',
    icone: '🧠',
  },
  {
    titulo: '3. Reconhecimento facial',
    descricao: 'Reconhecemos automaticamente quem está atendendo e iniciamos a contagem de interações.',
    icone: '👤',
  },
  {
    titulo: '4. Dashboard em tempo real',
    descricao: 'Você acompanha todos os atendimentos ao vivo, com relatórios claros e acionáveis.',
    icone: '📊',
  },
];

export default function ComoFunciona() {
  return (
    <section className='como-funciona'>
      <div className='container'>
        <h2>Legal, mas como funciona?</h2>
        <div className='passos-grid'>
          {passos.map((passo, index) => (
            <div key={index} className='passo-card'>
              <div className='icone'>{passo.icone}</div>
              <h3>{passo.titulo}</h3>
              <p>{passo.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
