import { Card, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import DatePicker from '../../components/DatePicker';
import GraficoEntradas from './graficos/Entradas';
import MapasCalor from './mapasCalor/MapasCalor';

export default function Dashboard() {
  const [filtro, setFiltro] = useState({ periodo: [new Date(), new Date()] });

  const changeFiltro = (value, key) => {
    if (key === 'periodo' && (!Array.isArray(value) || value.length !== 2)) {
      value = [new Date(), new Date()];
    }

    setFiltro({ ...filtro, [key]: value });
  }

  return (
    <Card title='Dashboard'>
      <Row gutter={[10, 10]}
        style={{ marginBottom: 20 }}>
        <Col xl={5}
          lg={6}
          md={8}
          sm={12}
          xs={24}>
          Selecionar período:
          <DatePicker rangePicker
            value={filtro.periodo}
            onChange={(value) => changeFiltro(value, 'periodo')} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[10, 20]}>
        <Col span={24}>
          <GraficoEntradas />
        </Col>
        <Divider />
        <Col span={24}>
          <MapasCalor />
        </Col>
      </Row>
    </Card>
  );
}