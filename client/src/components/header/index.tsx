import React from 'react';
import styles from './index.module.css';
import { Layout, Space, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import CustomButton from '../custom-button';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type='text' ghost={true}>
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type='text' ghost={true}>
            Зарегистрироваться
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type='text' ghost={true}>
            Войти
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};

export default Header;
