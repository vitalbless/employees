import React from 'react';
import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};
//скобочки после функции вот такие () используют чтобы вернуть обьект
const PasswordInput = ({ name, placeholder, dependencies }: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        { required: true, message: 'Обязательное поле' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              //здесь идет проверка а не валидация , валидация в rules до функции внутри которой getFieldValue
              //здесь если в инпуте валуе есть то мы выходим
              return Promise.resolve();
            }
            if (name === 'confirmPassword') {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли должны совпадать'));
            } else {
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size='large' />
    </Form.Item>
  );
};

export default PasswordInput;
