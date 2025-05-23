import React from 'react';
import { format } from 'date-fns';
import { Carousel, Col, Row } from 'antd';
import CardGrid from '../../../components/CardGrid';
import { useDashboardContext } from '../../../context/DashboardContext';

export default function MapasCalor() {
  const { data } = useDashboardContext();

  return (
    <CardGrid title='Mapas de calor'
      style={{ height: 550 }}
      color='#2ec1d7'>
      <Carousel dots
        draggable>
        {data.mapasCalor?.map((mapa, index) => {
          const dia = format(new Date(mapa.dia), 'dd/MM');

          return (
            <Row key={index}>
              <Col span={24}
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 600,
                }}>
                dia {dia}
              </Col>
              <img src={`/v1/mapas-calor/${mapa.uuid}`}
                alt={`Mapa de Calor do dia ${dia}`}
                style={{
                  width: 'auto',
                  height: 420,
                  margin: '0 auto',
                  borderRadius: 10,
                  marginTop: 10,
                }} />
            </Row>
          );
        })}
      </Carousel>
    </CardGrid>
  );
}