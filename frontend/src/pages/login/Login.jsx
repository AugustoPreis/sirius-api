import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Input, notification, Row, Spin } from 'antd';
import { Navigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../../assets/logo.png';
import { useAuth } from '../../providers/AuthProvider';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const auth = useAuth();

  const handleSubmit = (values) => {
    setLoading(true);

    axios.post('/v1/usuarios/login', {
      login: values.login,
      senha: values.senha,
    }).then(({ data }) => {
      setLoading(false);
      auth.login(data);
      notification.success({
        message: 'Sucesso!',
        description: (
          <span>
            Bem vindo(a) <b>{data.nome}</b>
          </span>
        ),
      });
    }).catch((err) => {
      setLoading(false);
      notification.error({
        message: 'Erro!',
        description: err.response.data.message,
      });
    });
  }

  if (auth.isAuthenticated()) {
    return (
      <Navigate to='/dashboard' />
    );
  }

  return (
    <Row justify='center'
      align='middle'
      style={{ height: '100%' }}>
      <Col xl={14}
        lg={16}
        md={20}
        xs={24}>
        <Card>
          <Spin spinning={loading}>
            <Form form={form}
              layout='vertical'
              onFinish={handleSubmit}>
              <Row gutter={[20, 5]}
                justify='space-between'>
                <Col md={12}
                  xs={0}>
                  <Row justify='center'>
                    <Col>
                      <img src={logo}
                        alt='Logo'
                        style={{ maxHeight: 300 }} />
                    </Col>
                  </Row>
                </Col>
                <Col md={12}
                  xs={24}>
                  <Row gutter={[10, 5]}>
                    <Col span={24}
                      style={{ fontSize: 32, textAlign: 'center' }}>
                      Bem vindo!
                    </Col>
                    <Col span={24}
                      style={{ fontSize: 16, opacity: 0.8, textAlign: 'center', marginBottom: 20 }}>
                      Realize o login na sua conta
                    </Col>
                    <Col span={24}>
                      <Form.Item noStyle
                        name='login'
                        rules={[{ required: true, message: '' }]}>
                        <Input size='large'
                          maxLength={100}
                          prefix={<UserOutlined />}
                          placeholder='Login...' />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item noStyle
                        name='senha'
                        extra={<a>Esqueci minha senha</a>}
                        rules={[{ required: true, message: '' }]}>
                        <Input.Password size='large'
                          maxLength={20}
                          prefix={<LockOutlined />}
                          placeholder='Senha...' />
                      </Form.Item>
                    </Col>
                    <Col span={24}
                      style={{ marginTop: '10%' }}>
                      <Button block
                        size='large'
                        type='primary'
                        onClick={form.submit}>
                        Entrar
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
}