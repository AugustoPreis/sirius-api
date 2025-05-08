import React from 'react';
import { Carousel, Col, Row } from 'antd';
import CardGrid from '../../../components/CardGrid';
import mapaCalorImg from './mapa-calor.jpg';

export default function MapasCalor() {
  const mapasCalor = [
    { dia: '01/05', img: mapaCalorImg },
    { dia: '02/05', img: mapaCalorImg },
    { dia: '03/05', img: mapaCalorImg },
    { dia: '04/05', img: mapaCalorImg },
    { dia: '05/05', img: mapaCalorImg },
    { dia: '06/05', img: mapaCalorImg },
    { dia: '07/05', img: mapaCalorImg },
    { dia: '08/05', img: mapaCalorImg },
    { dia: '09/05', img: mapaCalorImg },
    { dia: '10/05', img: mapaCalorImg },
  ];

  return (
    <CardGrid title='Mapas de calor'
      style={{ height: 550 }}
      color='#2ec1d7'>
      <Carousel dots
        draggable>
        {mapasCalor.map((mapa, index) => (
          <Row key={index}>
            <Col span={24}
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 600,
              }}>
              dia {mapa.dia}
            </Col>
            <img src={mapa.img}
              alt={mapa.dia}
              style={{
                width: 'auto',
                height: 420,
                margin: '0 auto',
                borderRadius: 10,
                marginTop: 10,
              }} />
          </Row>
        ))}
      </Carousel>
    </CardGrid>
  );
}