import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect, history } from 'umi';
import styles from './LoginPage.less';
import { loginApi } from '@/services/login';
import { Button } from '@/components';
import { t, tLabel } from '@/utils/label';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLoginDone = () => {
    setIsSubmitting(false);
    message.success('Login success!');
    setTimeout(() => {
      history.push('/dashboard');
    }, 500);
  };
  const onLoginFailure = () => {
    setIsSubmitting(false);
  };

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    loginApi(values, onLoginDone, onLoginFailure);
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (props) => (
            <Button
              key="submit"
              size="large"
              style={{ width: '100%' }}
              onClick={() => props.form?.submit()}
              loading={isSubmitting}
            >
              Login
            </Button>
          ),
        }}
        submitbuttonprops={{
          width: '100%',
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <ProFormText
          name="email"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={tLabel('pages.login.username.placeholder', 'Email')}
          rules={[
            {
              required: true,
              message: t("pages.login.username.required", "Please input your email!"),
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} style={{color: 'red'}}/>,
          }}
          placeholder={tLabel('pages.login.password.placeholder', 'Password')}
          rules={[
            {
              required: true,
              message: t("pages.login.password.required", "Please input password!"),
            },
          ]}
        />
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
