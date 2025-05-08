import { Carousel, Col, Divider, Row } from 'antd';
import React from 'react';
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
    <Row gutter={[10, 20]}
      justify='center'>
      <Col span={24}
        style={{
          fontSize: 20,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Mapas de Calor
      </Col>
      <Col xl={12}
        lg={14}
        md={20}
        xs={24}>
        <Carousel dots
          arrows>
          {mapasCalor.map((mapa, index) => (
            <Row key={index}>
              <Col span={24}
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 600,
                }}>
                {mapa.dia}
              </Col>
              <img src={mapa.img}
                alt={mapa.dia}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </Row>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}