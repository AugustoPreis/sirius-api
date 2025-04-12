import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './empresas.css';

const empresas = [
  { nome: 'Guzzatti', logo: 'public/logos/guzzatti.png' },
  { nome: 'Subway', logo: 'public/logos/subway.png' },
  { nome: 'Posto Avenida', logo: 'public/logos/posto-avenida.png' },
  { nome: 'SATC', logo: 'public/logos/satc.png' },
];

export default function EmpresasAtendidas() {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
        }
        },
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 2, 
        }
      }
    ]
  };

  return (
    <section className='empresas'>
      <div className='container'>
        <h2>Empresas que confiam na Sirius Vision</h2>
        <Slider {...settings}>
          {empresas.map((empresa, index) => (
            <div key={index} className='empresa-slide'>
              <img src={empresa.logo} alt={empresa.nome} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
