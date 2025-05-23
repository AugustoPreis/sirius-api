import React, { useState, useEffect } from 'react';
import { Card, Col, Divider, Modal, Row, Spin } from 'antd';
import axios from 'axios';
import DatePicker from '../../components/DatePicker';
import { DashboardContext } from '../../context/DashboardContext';
import GraficoEntradas from './graficos/Entradas';
import MapasCalor from './mapasCalor/MapasCalor';
import GraficoHomensMulheres from './graficos/HomensMulheres';
import Cards from './Cards';

export default function Dashboard() {
  const [filtro, setFiltro] = useState({ periodo: [new Date(), new Date()] });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, [filtro]);

  const fetchData = () => {
    setLoading(true);

    const params = {
      inicio: filtro.periodo[0].toISOString(),
      fim: filtro.periodo[1].toISOString(),
    }

    axios.get('/v1/dashboard', {
      params,
    }).then((res) => {
      setLoading(false);
      setData(res.data);
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.response.data.message,
      });
    });
  }

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
      <DashboardContext.Provider value={{ data, loading }}>
        <Spin spinning={loading}
          size='large'>
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
        </Spin>
      </DashboardContext.Provider>
    </Card>
  );
}