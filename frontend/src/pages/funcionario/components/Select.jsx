import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Col, Modal, Pagination, Row, Select as SelectAntd } from 'antd';

const initialState = {
  pagination: {
    pagina: 1,
    itensPagina: 10,
  },
}

export default function Select({ value, onChange, ...props }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(initialState.pagination);
  const [funcionarios, setFuncionarios] = useState([]);
  const data = useMemo(() => {
    if (!Array.isArray(funcionarios) || !funcionarios.length) {
      return [];
    }

    return funcionarios.map((funcionario) => ({
      value: funcionario.id,
      label: funcionario.nome,
    }));
  }, [funcionarios]);

  useEffect(() => {
    if (!visible) {
      setFuncionarios([]);
      setPagination(initialState.pagination);

      return;
    }

    fetch();
  }, [visible]);

  const fetch = (pagina = initialState.pagination.pagina) => {
    setLoading(true);

    const params = {
      pagina,
      itensPagina: pagination.itensPagina,
    }

    axios.get('/v1/funcionarios', {
      params,
    }).then(({ data }) => {
      setLoading(false);
      setFuncionarios(data.data);
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

  return (
    <SelectAntd {...props}
      value={value?.id}
      onChange={(value) => onChange?.(funcionarios.find((funcionario) => funcionario.id === value))}
      options={data}
      loading={loading}
      allowClear
      style={{ width: '100%' }}
      onDropdownVisibleChange={(visible) => setVisible(visible)}
      dropdownRender={(menu) => (
        <Row justify='end'
          gutter={[10, 10]}>
          <Col span={24}>
            {menu}
          </ Col>
          <Col>
            <Pagination size='small'
              current={pagination.pagina}
              pageSize={pagination.itensPagina}
              total={pagination.total}
              onChange={(pagina) => fetch(pagina)} />
          </Col>
        </Row>
      )} />
  )
}