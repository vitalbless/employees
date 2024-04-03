import React from 'react';
import { Button, Form } from 'antd';

type Props = {
  children: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  type?: 'link' | 'default' | 'text' | 'primary' | 'dashed' | undefined;
  danger?: boolean | undefined;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round' | undefined;
  icon?: React.ReactNode;
  ghost?: true;
};

const CustomButton = ({
  children,
  htmlType = 'button',
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
  ghost,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        ghost={ghost}
      >
        {children}
      </Button>
    </Form.Item>
  );
};

export default CustomButton;
