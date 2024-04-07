import React from 'react';
import Layout from '../../components/layout';
import { Card, Form, Row, Space, Typography } from 'antd';
import CustomInput from '../../components/custom-input';
import PasswordInput from '../../components/password-input';
import CustomButton from '../../components/custom-button';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

const Login = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Вход' style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput name='email' placeholder='Email' type='email' />
            <PasswordInput name='password' placeholder='Пароль' />
            <CustomButton type='primary' htmlType='submit'>
              Войти
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрироваться</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
