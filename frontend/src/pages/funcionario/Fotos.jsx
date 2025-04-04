import React, { useState } from 'react';
import axios from 'axios';
import { Row, Modal, Button, Spin, Col, Table, Upload, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { abrirJanela } from '../../utils/abrirJanela';

export default function Fotos({ id, children }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Nº',
      key: 'id',
      dataIndex: 'id',
      width: 60,
      render: (_, __, index) => `Nº ${index + 1}`,
    },
    {
      title: 'Item',
      key: 'uuid',
      dataIndex: 'uuid',
      render: (uuid) => (
        <a onClick={() => abrirJanela(`/v1/funcionarios/${id}/fotos/${uuid}`)}>
          Visualizar foto
        </a>
      ),
    },
    {
      title: '',
      key: 'uuid',
      dataIndex: 'uuid',
      align: 'center',
      width: 35,
      render: (uuid) => (
        <Popconfirm title='Remover foto?'
          onConfirm={() => handleDelete(uuid)}>
          <Button danger
            type='primary'
            icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const modal = (e) => {
    e.stopPropagation();
    setVisible(true);

    if (id) {
      fetch();
    }
  }

  const fetch = () => {
    if (!id) {
      return;
    }

    setLoading(true);

    axios
      .get(`/v1/funcionarios/${id}/fotos`)
      .then((data) => {
        setLoading(false);
        setData(data.data);
      }).catch((err) => {
        setLoading(false);
        Modal.error({
          title: 'Erro!',
          content: err.response.data.message,
        });
      });
  }

  const handleSubmit = (foto) => {
    setLoading(true);

    const formData = new FormData();

    formData.append('foto', foto.originFileObj);
    formData.append('idFuncionario', id);

    axios
      .post(`/v1/funcionarios/${id}/fotos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        message.success('Imagem adicionada com sucesso!');
        fetch();
      }).catch((err) => {
        setLoading(false);
        Modal.error({
          title: 'Erro!',
          content: err.response.data.message,
        });
      });
  }

  const handleDelete = (uuid) => {
    setLoading(true);

    axios
      .delete(`/v1/funcionarios/${id}/fotos/${uuid}`)
      .then(() => {
        fetch();
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
        title='Fotos do Funcionário'
        destroyOnClose
        centered
        maskClosable={false}
        onCancel={handleClear}
        footer={
          <Button type='primary'
            onClick={handleClear}>
            Fechar
          </Button>
        }>
        <Spin spinning={loading}>
          <Row gutter={[10, 10]}>
            <Col span={24}
              style={{ marginTop: 20 }}>
              <Upload type='select'
                beforeUpload={() => false}
                accept='image/*'
                fileList={null}
                onChange={(e) => handleSubmit(e.fileList?.[0])}>
                <Button block
                  type='primary'
                  ghost>
                  Adicionar foto
                </Button>
              </Upload>
            </Col>
            <Col span={24}>
              <Table size='small'
                rowKey='id'
                columns={columns}
                pagination={false}
                dataSource={data} />
            </Col>
          </Row>
        </Spin>
      </Modal>
    </span>
  );
}