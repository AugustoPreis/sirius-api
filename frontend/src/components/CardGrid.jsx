import React from 'react';
import { Card, Col, Row } from 'antd';

export default function CardGrid({ title, style, children, value, color, ...props }) {

  return (
    <Card.Grid {...props}
      style={{
        ...style,
        width: '100%',
        padding: 0,
        border: '1px solid #a4b0be',
        textAlign: 'center',
      }}>
      <Row align='center'
        justify='center'>
        <Col span={24}
          style={{ backgroundColor: color }}>
          <h4 style={{ color: '#fff', fontSize: 16 }}>
            {title}
          </h4>
        </Col>
        <Col span={24}
          style={{ padding: 10, fontSize: 17, borderTop: '1px solid #a4b0be' }}>
          {value || children}
        </Col>
      </Row>
    </Card.Grid>
  )
}