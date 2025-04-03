import React from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';
import Suspense from './Suspense';
import Footer from './Footer';

export default function Painel() {

  return (
    <Row justify='center'>
      <Col span={24}
        style={{ minHeight: '90vh', padding: '3vh' }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Col>
      <Col span={23}>
        <Footer />
      </Col>
    </Row>
  );
}