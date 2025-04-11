import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './depoimentos.css';

const depoimentos = [
  {
    nome: 'João Silva',
    empresa: 'Loja XYZ',
    comentario: 'A Sirius Vision aumentou nosso controle de atendimento em 80%. Simplesmente indispensável!',
  },
  {
    nome: 'Maria Oliveira',
    empresa: 'Clínica Olhar',
    comentario: 'Tecnologia de ponta, suporte excelente. Recomendo para qualquer empresa de varejo.',
  },
  {
    nome: 'Carlos Souza',
    empresa: 'AutoPeças Sul',
    comentario: 'A inteligência do sistema transformou nosso pós-venda. Resultado visível em 1 mês.',
  },
  {
    nome: 'Fernanda Costa',
    empresa: 'Óticas Futura',
    comentario: 'Fiquei impressionada com a precisão do reconhecimento facial. Mudou nossa operação.',
  },
  {
    nome: 'Ricardo Martins',
    empresa: 'Farmácia Nova',
    comentario: 'Agora sei exatamente quem está atendendo, por quanto tempo e quantos clientes. Vale cada centavo.',
  },
  {
    nome: 'Tatiane Borges',
    empresa: 'Loja TopMóveis',
    comentario: 'O dashboard em tempo real me dá clareza que nunca tive. Virou rotina aqui na gestão.',
  },
];

export default function Depoimentos() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3, // <-- mostra 3 no desktop
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className='depoimentos'>
      <div className='container'>
        <h2>O que dizem nossos clientes</h2>
        <Slider {...settings}>
          {depoimentos.map((dep, index) => (
            <div key={index} className='depoimento-card'>
              <p className='comentario'>"{dep.comentario}"</p>
              <p className='cliente'>— {dep.nome}, {dep.empresa}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
