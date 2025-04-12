import React from 'react';
import './demoInterativo.css';

export default function DemoInterativo() {
  return (
    <section className='demo-interativo'>
      <div className='container'>
        <h2>Teste o sistema agora mesmo</h2>
        <p className='descricao'>
          Interaja com o painel e veja como a Sirius Vision transforma atendimentos em inteligência em tempo real.
        </p>

        <div className='iframe-wrapper'>
          <iframe
            id='supademo-iframe'
            src="https://app.supademo.com/embed/cm1b2ay6c1645ououv18dg0fm?embed_v=2"
            loading="lazy"
            title="Painel Sirius Vision"
            allow="clipboard-write"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
