import React, { lazy, useState } from 'react';
import { Card, Col, Divider, Form, Row, Tabs } from 'antd';
import { DashboardContext } from '../../context/DashboardContext';
import Suspense from '../../components/Suspense';
import DatePicker from '../../components/DatePicker';
import SelectFuncionario from '../funcionario/components/Select';

const Atendimentos = lazy(() => import('./atendimentos/Atendimentos'));

export default function Dashboard() {
  const [filtro, setFiltro] = useState({ dia: new Date() });
  const tabs = [
    {
      key: 'atendimentosFuncionario',
      label: 'Atendimentos por Funcionário',
      children: <Atendimentos />,
    },
  ];

  const changeFiltro = (value, key) => {
    if (key === 'dia' && !value) {
      value = new Date();
    }

    setFiltro({ ...filtro, [key]: value });
  }

  return (
    <Card title='Dashboard'>
      <Row gutter={[10, 5]}>
        <Col xl={3}
          lg={4}
          md={6}
          sm={8}
          xs={24}>
          <Form.Item layout='vertical'
            label='Dia'>
            <DatePicker value={filtro.dia}
              allowClear={false}
              onChange={(value) => changeFiltro(value, 'dia')} />
          </Form.Item>
        </Col>
        <Col xl={8}
          lg={10}
          md={14}
          sm={16}
          xs={24}>
          <Form.Item layout='vertical'
            label='Filtrar por Funcionário'>
            <SelectFuncionario value={filtro.funcionario}
              onChange={(value) => changeFiltro(value, 'funcionario')} />
          </Form.Item>
        </Col>
        <Divider />
        <Col span={24}>
          <DashboardContext.Provider value={{ filtro }}>
            <Suspense message='Carregando dashboard...'>
              <Tabs items={tabs}
                defaultActiveKey='atendimentosFuncionario' />
            </Suspense>
          </DashboardContext.Provider>
        </Col>
      </Row>
    </Card>
  );
}