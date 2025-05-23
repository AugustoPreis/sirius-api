import React from 'react';
import { format } from 'date-fns';
import { Button, Card, Col, Pagination, Popconfirm, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import NotFound from '../../components/NotFound';
import Cadastro from './Cadastro';

export default function Listagem({ data, fetch, pagination, onDelete }) {

  if (!Array.isArray(data) || !data.length) {
    return (
      <NotFound />
    );
  }

  return (
    <Row gutter={[10, 10]}
      justify='end'>
      {data.map((usuario) => (
        <Col key={usuario.id}
          span={24}>
          <Card hoverable>
            <Row gutter={[10, 5]}
              align='middle'>
              <Col span={20}>
                <Row gutter={[10, 5]}>
                  <Col span={24}
                    style={{ fontSize: 24 }}>
                    {usuario.nome}
                  </Col>
                  <Col span={24}>
                    <b>Cadastrado em:</b> {format(new Date(usuario.dataCadastro), 'dd/MM/yyyy')}
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Row gutter={[5, 5]}
                  justify='end'>
                  <Col>
                    <Cadastro id={usuario.id}
                      onClose={() => fetch()}>
                      <Button icon={<EditOutlined />} />
                    </Cadastro>
                  </Col>
                  <Col>
                    <Popconfirm title='Remover registro?'
                      onConfirm={() => onDelete(usuario.id)}>
                      <Button danger
                        type='primary'
                        icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
      <Pagination current={pagination.pagina}
        pageSize={pagination.itensPagina}
        total={pagination.total}
        onChange={(current) => fetch(current)} />
    </Row>
  );
}