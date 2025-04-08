import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Divider, Modal, Row, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useDashboardContext } from '../../../context/DashboardContext';
import NotFound from '../../../components/NotFound';
import Historico from './Historico';

export default function Atendimentos() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { filtro } = useDashboardContext();

  useEffect(() => {
    fetch();
  }, [filtro]);

  const fetch = () => {
    if (!filtro.dia) {
      return handleClear();
    }

    setLoading(true);

    const params = {
      dia: filtro.dia,
      idFuncionario: filtro.funcionario?.id,
    }

    axios.get('/v1/atendimentos/quantidade-por-funcionario', {
      params,
    }).then(({ data }) => {
      setLoading(false);
      setData(data);
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.response.data.message,
      });
    });
  }

  const handleClear = () => {
    setData([]);
    setLoading(false);
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={[20, 20]}
        justify='center'>
        {data.length === 0 ? (
          <NotFound />
        ) : data.map((item, index) => (
          <Col key={index}
            xl={8}
            md={12}
            xs={24}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
                {item.funcionario.nome}
              </h2>
              <p style={{ fontSize: 16, marginTop: 5 }}>
                Atendimentos realizados: {item.quantidade}
              </p>
              <Divider style={{ margin: 10 }} />
              <Historico dia={filtro.dia}
                idFuncionario={item.funcionario.id}
                nomeFuncionario={item.funcionario.nome}>
                <Button icon={<EyeOutlined />}>
                  Histórico
                </Button>
              </Historico>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  );
}