import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SelectLang, useIntl, connect, Redirect } from 'umi';
import React from 'react';
import styles from './AuthLayout.less';
import { getUser } from '@/utils/localStorage'
import logo from '@/assets/images/navLogo.png';
import loginBgImage from '@/assets/images/loginBg.png'

const AuthLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });

  const myUser = getUser()  
  if (myUser) {
    return (
      <Redirect to='/dashboard' />
    )
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>        
        <div className={styles.content}>
          <div className={styles.leftSide}
            style={{
              backgroundImage: `url(${loginBgImage})`
            }}
          >
          </div>
          <div className={styles.rightSide}>
            <div className={styles.top}>
              <img alt="logo" className={styles.logo} src={logo} />
            </div>
            {children}
          </div>          
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(AuthLayout);
