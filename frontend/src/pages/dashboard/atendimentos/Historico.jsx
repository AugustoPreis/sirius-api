import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Row, Modal, Button, Spin, Col, Table } from 'antd';

const initialState = {
  pagination: {
    pagina: 1,
    itensPagina: 5,
  },
}

export default function Historico({ idFuncionario, nomeFuncionario, dia, children }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(initialState.pagination);
  const columns = [
    {
      title: 'Início',
      dataIndex: 'dataInicio',
      key: 'dataInicio',
      width: '50%',
      render: (value) => format(new Date(value), 'HH:mm'),
    },
    {
      title: 'Fim',
      dataIndex: 'dataFim',
      key: 'dataFim',
      width: '50%',
      render: (value) => format(new Date(value), 'HH:mm'),
    },
  ];

  const modal = (e) => {
    e.stopPropagation();
    setVisible(true);

    if (idFuncionario) {
      fetch();
    }
  }

  const fetch = (pagina = initialState.pagination.pagina) => {
    if (!idFuncionario) {
      return;
    }

    setLoading(true);

    const params = {
      idFuncionario,
      dia,
      pagina,
      itensPagina: pagination.itensPagina,
    }

    axios.get('/v1/atendimentos', {
      params,
    }).then(({ data }) => {
      setLoading(false);
      setData(data.data);
      setPagination({
        ...pagination,
        pagina,
        total: data.total,
      });
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.response.data.message,
      });
    });
  }

  const handleClear = () => {
    setLoading(false);
    setVisible(false);
    setData([]);
  }

  return (
    <span>
      <span onClick={modal}
        style={{ cursor: 'pointer' }}>
        {children}
      </span>
      <Modal open={visible}
        title='Histórico de Atendimentos'
        destroyOnClose
        centered
        width={400}
        maskClosable={false}
        onCancel={handleClear}
        footer={
          <Button type='primary'
            onClick={handleClear}>
            Fechar
          </Button>
        }>
        <Spin spinning={loading}>
          <Row gutter={[10, 5]}
            justify='center'>
            <Col style={{ textAlign: 'center', margin: '15px 0px', fontWeight: 600 }}>
              {nomeFuncionario}
              <br />
              {format(new Date(dia), 'dd/MM/yyyy')}
            </Col>
            <Col span={24}>
              <Table size='small'
                bordered
                rowKey='id'
                columns={columns}
                dataSource={data}
                onChange={(pag) => fetch(pag.current)}
                pagination={{
                  current: pagination.pagina,
                  pageSize: pagination.itensPagina,
                  total: pagination.total,
                }} />
            </Col>
          </Row>
        </Spin>
      </Modal>
    </span>
  );
}