import { Col, Divider, Row } from 'antd';
import React from 'react';

export default function Footer() {

  return (
    <Row gutter={[10, 5]}
      justify='center'>
      <Divider />
      <Col>
        &copy; {new Date().getFullYear()} <a href='#'>Sirius Vision</a>
      </Col>
    </Row>
  );
}