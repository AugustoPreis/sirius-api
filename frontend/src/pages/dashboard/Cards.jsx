import React from 'react';
import { Row, Col } from 'antd';
import CardGrid from '../../components/CardGrid';

export default function Cards() {

  return (
    <Row gutter={[10, 10]}>
      <Col xl={5}
        sm={12}
        xs={24}>
        <CardGrid title='Entradas na loja'
          value='200'
          color='#2ec1d7' />
      </Col>
      <Col xl={5}
        sm={12}
        xs={24}>
        <CardGrid title='Vendas Realizadas'
          value='22'
          color='#2ec1d7' />
      </Col>
      <Col xl={5}
        md={8}
        sm={12}
        xs={24}>
        <CardGrid title='Valor Vendido'
          value='R$ 1.250,00'
          color='#2ec1d7' />
      </Col>
      <Col xl={5}
        md={8}
        sm={12}
        xs={24}>
        <CardGrid title='Ticket Médio'
          value='R$ 56,81'
          color='#2ec1d7' />
      </Col>
      <Col xl={4}
        md={8}
        xs={24}>
        <CardGrid title='% de Conversão'
          value='11%'
          color='#2ec1d7' />
      </Col>
    </Row>
  );
}