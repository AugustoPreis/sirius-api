import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Divider, Input, Modal, Row, Spin } from 'antd';
import Listagem from './Listagem';
import Cadastro from './Cadastro';

const initialState = {
  pagination: {
    pagina: 1,
    itensPagina: 10,
  }
}

export default function Usuario() {
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({});
  const [pagination, setPagination] = useState(initialState.pagination);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch();
    }, 300);

    return () => clearTimeout(timeout);
  }, [filtro]);

  const fetch = (pagina = initialState.pagination.pagina) => {
    setLoading(true);

    const params = {
      pagina,
      nome: filtro.nome,
      itensPagina: pagination.itensPagina,
    };

    axios.get('/v1/usuarios', {
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

  const handleDelete = (id) => {
    if (!id) {
      return;
    }

    setLoading(true);

    axios.delete(`/v1/usuarios/${id}`)
      .then(() => {
        //volta para a página anterior caso o item deletado seja o último da página
        fetch(pagination.pagina - (data.length && pagination.pagina > 1 === 1 ? 1 : 0));
      })
      .catch((err) => {
        setLoading(false);
        Modal.error({
          title: 'Erro!',
          content: err.response.data.message,
        });
      });
  }

  const changeFiltro = (value, key) => {
    setFiltro({ ...filtro, [key]: value });
  }

  return (
    <Card title='Usuários'>
      <Spin spinning={loading}>
        <Row gutter={[10, 10]}>
          <Col xl={6}
            lg={8}
            md={10}
            sm={14}
            xs={24}>
            <Input value={filtro.nome}
              placeholder='Filtrar por nome...'
              onChange={(e) => changeFiltro(e.target.value, 'nome')} />
          </Col>
          <Col xl={{ span: 3, offset: 15 }}
            lg={{ span: 4, offset: 12 }}
            md={{ span: 6, offset: 8 }}
            sm={10}
            xs={24}>
            <Cadastro onClose={() => fetch()}>
              <Button block
                type='primary'>
                Cadastrar
              </Button>
            </Cadastro>
          </Col>
        </Row>
        <Divider />
        <Listagem data={data}
          pagination={pagination}
          onDelete={handleDelete}
          fetch={fetch} />
      </Spin>
    </Card>
  )
}