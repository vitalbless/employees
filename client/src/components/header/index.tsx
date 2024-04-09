import React from 'react';
import styles from './index.module.css';
import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import CustomButton from '../custom-button';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type='link'>
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type='text' icon={<UserOutlined />}>
            Зарегистрироваться
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type='text' icon={<LoginOutlined />}>
            Войти
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};

export default Header;
