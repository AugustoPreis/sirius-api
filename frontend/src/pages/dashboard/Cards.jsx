import React from 'react';
import { Row, Col } from 'antd';
import { useDashboardContext } from '../../context/DashboardContext';
import CardGrid from '../../components/CardGrid';

export default function Cards() {
  const { data } = useDashboardContext();
  const valorVendido = data.valorVendido?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const ticketMedio = data.ticketMedio?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const percentualConversao = data.percentualConversao?.toLocaleString('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Row gutter={[10, 10]}>
      <Col xl={5}
        sm={12}
        xs={24}>
        <CardGrid title='Entradas na loja'
          value={data.entradas?.toString()}
          color='#2ec1d7' />
      </Col>
      <Col xl={5}
        sm={12}
        xs={24}>
        <CardGrid title='Vendas Realizadas'
          value={data.vendas?.toString()}
          color='#2ec1d7' />
      </Col>
      <Col xl={5}
        md={8}
        sm={12}
        xs={24}>
        <CardGrid title='Valor Vendido'
          value={valorVendido}
          color='#2ec1d7' />
      </Col>
      <Col xl={5}
        md={8}
        sm={12}
        xs={24}>
        <CardGrid title='Ticket Médio'
          value={ticketMedio}
          color='#2ec1d7' />
      </Col>
      <Col xl={4}
        md={8}
        xs={24}>
        <CardGrid title='% de Conversão'
          value={percentualConversao}
          color='#2ec1d7' />
      </Col>
    </Row>
  );
}