import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import DatePicker from '../../components/DatePicker';
import GraficoEntradas from './graficos/Entradas';

export default function Dashboard() {

  return (
    <Card title='Dashboard'>
      <Row gutter={[10, 10]}
        style={{ marginBottom: 20 }}>
        <Col xl={3}
          lg={4}
          md={6}
          sm={8}
          xs={24}>
          Selecionar dia:
          <DatePicker />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[10, 20]}>
        <Col span={24}>
          <GraficoEntradas />
        </Col>
      </Row>
    </Card>
  );
}