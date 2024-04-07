import React from 'react';
import Layout from '../../components/layout';
import { CarFilled } from '@ant-design/icons';
import { Card, Form, Input, Row } from 'antd';

const Login = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Войдите' style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <Input />
          </Form>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
