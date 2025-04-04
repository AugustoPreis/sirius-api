import React, { useState } from 'react';
import axios from 'axios';
import { Row, Modal, Form, Spin, message, Col, Input } from 'antd';
import DatePicker from '../../components/DatePicker';

export default function Cadastro({ id, children, onClose }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const modal = (e) => {
    e.stopPropagation();
    setVisible(true);

    if (id) {
      fetch();
    }
  }

  const fetch = () => {
    setLoading(true);

    axios
      .get(`/v1/funcionarios/${id}`)
      .then(({ data }) => {
        setLoading(false);
        form.setFieldsValue(data);
      }).catch((err) => {
        setLoading(false);
        Modal.error({
          title: 'Erro!',
          content: err.response.data.message,
        });
      });
  }

  const handleSubmit = (values) => {
    setLoading(true);

    axios({
      method: id ? 'PUT' : 'POST',
      url: `/v1/funcionarios${id ? `/${id}` : ''}`,
      data: values,
    }).then(() => {
      message.success('Funcionário salvo com sucesso!');
      handleClear();
      onClose?.();
    }).catch((err) => {
      setLoading(false);
      Modal.error({
        title: 'Erro!',
        content: err.response.data.message,
      });
    });
  }

  const handleClear = () => {
    form.resetFields();
    setLoading(false);
    setVisible(false);
  }

  return (
    <span>
      <span onClick={modal}
        style={{ cursor: 'pointer' }}>
        {children}
      </span>
      <Modal open={visible}
        title='Dados do Funcionário'
        okText='Salvar'
        width={700}
        centered
        destroyOnClose
        onCancel={handleClear}
        onOk={form.submit}>
        <Form form={form}
          layout='vertical'
          onFinish={handleSubmit}
          onFinishFailed={() => message.info('Preencha os campos obrigatórios para continuar')}>
          <Spin spinning={loading}>
            <Row gutter={[10, 5]}>
              <Col sm={16}
                xs={24}>
                <Form.Item name='nome'
                  label='Nome'
                  rules={[{ required: true, message: '' }]}>
                  <Input maxLength={100} />
                </Form.Item>
              </Col>
              <Col sm={8}
                xs={24}>
                <Form.Item name='dataAdmissao'
                  label='Data de Admissão'
                  rules={[{ required: true, message: '' }]}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='observacoes'
                  label='Observações'>
                  <Input.TextArea maxLength={250}
                    autoSize={{ minRows: 2, maxRows: 5 }} />
                </Form.Item>
              </Col>
            </Row>
          </Spin>
        </Form>
      </Modal>
    </span>
  );
}