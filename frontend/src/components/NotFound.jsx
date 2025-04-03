import React from 'react';
import { Row, Col } from 'antd';

export default function NotFound({ text = 'Nenhum registro encontrado' }) {
  return (
    <Row>
      <Col span={24}
        style={{
          fontSize: 25,
          opacity: 0.8,
          fontWeight: 'bold',
          padding: '35px 0px',
          textAlign: 'center',
        }}>
        {text}
      </Col>
    </Row>
  );
}