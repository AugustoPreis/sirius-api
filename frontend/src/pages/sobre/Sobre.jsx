import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import './sobre.css';
import Depoimentos from './Depoimentos'; 
import ComoFunciona from './ComoFunciona';
import EmpresasAtendidas from './EmpresasAtendidas'; 
import DemoDashboard from './DemoDashboard';
import Faq from './Faq';
import CtaFinal from './CtaFinal';
import DemoInterativo from './DemoInterativo';



export default function Sobre() {
  const [contato, setContato] = useState({});
  const servicos = [
    {
      title: 'Contador de Atendimentos',
      description: 'Soluções personalizadas para contar a quantidade de atendimentos realizados',
    },
    {
      title: 'Reconhecimento de Imagens',
      description: 'Algoritmos avançados para identificar objetos, pessoas e padrões em imagens e vídeos.',
    },
    {
      title: 'Dashboard em tempo real',
      description: 'Sistemas para acompanhamento de métricas e desempenho em tempo real, com visualizações interativas.',
    },
  ];

  const changeContato = (value, key) => {
    setContato({ ...contato, [key]: value });
  }

  const handleSubmit = () => {
    // Lógica de envio do formulário
  }

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <img className='logo' alt='Logo' src={logo} />
          <nav className='nav'>
            <a href='#sobre'>Sobre</a>
            <a href='#servicos'>Serviços</a>
            <a href='#contato'>Contato</a>
          </nav>
        </div>
      </header>

      <section className='hero'>
        <div className='container hero-content'>
          <div className='hero-texto'>
            <h2>Inteligência para ver além</h2>
            <p>Transformamos imagens em decisões com tecnologia de ponta.</p>
            <a href='#contato' className='btn'>
              Fale com a gente
            </a>
          </div>
          <div className='hero-gif'>
            <img src='/gifs/gif-computer-vision.gif' alt='Demonstração de visão computacional' />
          </div>
        </div>
      </section>


      <section id='sobre' className='sobre'>
        <div className='container'>
          <h2>Sobre a Sirius Vision</h2>
          <p>
            A Sirius Vision é uma startup inovadora especializada em soluções de
            visão computacional e inteligência artificial. Nossa missão é fornecer
            ferramentas inteligentes para interpretar o mundo visual e impulsionar
            a tomada de decisões nos negócios, ajudando você empresário a ter dados
            da produtividade de sua equipe em tempo real, além de medir outros padrões
            importantes para o desenvolvimento do seu negócio.
          </p>
        </div>
      </section>

      {/* NOVA SEÇÃO: Como Funciona */}
      <ComoFunciona />

      <section id='servicos' className='servicos'>
        <div className='container'>
          <h2>Nossos Serviços</h2>
          <div className='servicos-grid'>
            {servicos.map((servico, index) => (
              <div key={index} className='card'>
                <h3>{servico.title}</h3>
                <p>{servico.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* NOVA SEÇÃO: Demonstração do Dashboard */}
      {/*<DemoDashboard />*/}

      {/* NOVA SEÇÃO: Demonstração Interativa */}
      <DemoInterativo />


      {/* SEÇÃO DEPOIMENTOS */}
      <Depoimentos />


      {/* NOVA SEÇÃO: Empresas Atendidas */}
      <EmpresasAtendidas />

      {/* NOVA SEÇÃO: FAQ */}
      <Faq />

      {/* NOVA SEÇÃO: CTA Final */}
      <CtaFinal />


      <section id='contato' className='contato'>
        <div className='container'>
          <h2>Entre em Contato</h2>
          <p>Quer saber mais? Envie uma mensagem para nosso time, que vamos entrar em contato assim que possível.</p>
          <form className='form' onSubmit={handleSubmit}>
            <input
              required
              type='text'
              placeholder='Nome'
              value={contato.nome || ''}
              onChange={(e) => changeContato(e.target.value, 'nome')}
            />
            <input
              required
              type='text'
              placeholder='Telefone'
              value={contato.telefone || ''}
              onChange={(e) => changeContato(e.target.value, 'telefone')}
            />
            <input
              required
              type='email'
              placeholder='E-mail'
              value={contato.email || ''}
              onChange={(e) => changeContato(e.target.value, 'email')}
            />
            <textarea
              required
              placeholder='Sua mensagem...'
              value={contato.mensagem || ''}
              onChange={(e) => changeContato(e.target.value, 'mensagem')}
            />
            <button className='btn' type='submit'>
              Enviar
            </button>
          </form>
        </div>
      </section>

      <footer className='footer'>
        <div className='container'>
          <p>&copy; {new Date().getFullYear()} Sirius Vision. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
