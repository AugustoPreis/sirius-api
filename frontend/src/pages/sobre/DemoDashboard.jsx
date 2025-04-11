import React from 'react';
import './demoDashboard.css';

export default function DemoDashboard() {
  return (
    <section className='demo-dashboard'>
      <div className='container'>
        <h2>Veja o sistema em ação</h2>
        <p className='descricao'>
          Acompanhe como o dashboard da Sirius Vision apresenta atendimentos em tempo real, de forma visual e inteligente.
        </p>

        {/* Responsivo com <picture> para diferentes tamanhos */}
        <picture>
          <source media="(max-width: 480px)" srcSet="/gifs/dashboard-mobile.gif" />
          <source media="(max-width: 768px)" srcSet="/gifs/dashboard-tablet.gif" />
          <img src="/gifs/dashboard-desktop.gif" alt="Demonstração do dashboard da Sirius Vision" />
        </picture>
      </div>
    </section>
  );
}
