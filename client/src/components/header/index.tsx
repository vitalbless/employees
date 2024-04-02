import React from 'react';
import styles from './index.module.css';
import { Layout, Space, Typography, Button } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Button type='link'>Click</Button>
      </Space>
    </Layout.Header>
  );
};

export default Header;
