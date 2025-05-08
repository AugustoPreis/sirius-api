import { Card, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import DatePicker from '../../components/DatePicker';
import GraficoEntradas from './graficos/Entradas';
import MapasCalor from './mapasCalor/MapasCalor';
import GraficoHomensMulheres from './graficos/HomensMulheres';
import Cards from './Cards';

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
      <Row>
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
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Cards />
        </Col>
        <Col xl={12}
          xs={24}>
          <GraficoHomensMulheres />
        </Col>
        <Col xl={12}
          xs={24}>
          <MapasCalor />
        </Col>
        <Col span={24}>
          <GraficoEntradas />
        </Col>
      </Row>
    </Card>
  );
}