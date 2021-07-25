/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { RouteContext } from '@ant-design/pro-layout';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useIntl, connect, Redirect } from 'umi';
import RightContent from './header/RightContent';
import { checkPageAccess, checkMenuAccess } from '@/utils/authority';
import logo from '@/assets/logo.svg';
import { PageLoading } from '@/components';
import { getUser } from '@/utils/localStorage';
import { getPageTitle } from '@/utils/ui';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './AdminLayout.less';
import menuLogoImage from '@/assets/images/navLogo.png';
import headerLogoImage from '@/assets/images/favicon.png';
import MenuIcon from './menu/MenuIcon';

/** Use Authorized check all menu item */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const myUser = getUser();
    const accessable = checkMenuAccess(myUser, item);
    if (!accessable) return undefined;

    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };

    return localItem;
  });

const AdminLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  const myUser = getUser();
  const menuDataRef = useRef([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (menuDataRef.current) {
      setIsReady(true);
    }
  }, [menuDataRef]);
  /** Init variables */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const { formatMessage } = useIntl();

  if (!myUser) {
    return <Redirect to="/auth/login" />;
  }
  return (
    <>
      {!isReady ? (
        <PageLoading />
      ) : (
        <ProLayout
          logo={logo}
          formatMessage={formatMessage}
          {...props}
          {...settings}
          onCollapse={handleMenuCollapse}
          menuHeaderRender={() => {
            return (
              <div className="sider-logo">
                <Link to="/dashboard">
                  <img src={menuLogoImage} className="desktop-logo-header" alt="Aluva Admin" />
                  <img src={headerLogoImage} className="mobile-header" alt="Aluva Admin" />
                </Link>
              </div>
            );
          }}
          headerContentRender={(context) => {
            return <span className={styles.pageTitle}>{getPageTitle(context)}</span>;
          }}
          menuItemRender={(menuItemProps) => {
            const LinkItem = (
              <span className="ant-pro-menu-item">
                <span className="ant-pro-menu-item-icon">
                  <MenuIcon icon={menuItemProps.icon} />
                </span>
                <span className="ant-pro-menu-item-title">{menuItemProps.name}</span>
              </span>
            );
            if (
              menuItemProps.isUrl ||
              !menuItemProps.path ||
              location.pathname === menuItemProps.path
            ) {
              return LinkItem;
            }

            return <Link to={menuItemProps.path}>{LinkItem}</Link>;
          }}
          subMenuItemRender={(menuItemProps) => {
            const LinkItem = (
              <span className="ant-pro-menu-item">
                <span className="ant-pro-menu-item-icon">
                  <MenuIcon icon={menuItemProps.icon} />
                </span>
                <span className="ant-pro-menu-item-title">{menuItemProps.name}</span>
              </span>
            );
            return LinkItem;
          }}
          itemRender={() => {
            return null;
          }}
          menuContentRender={(headerViewProps, defaultDom) => {
            return (
              <Scrollbars
                autoHide
                renderTrackVertical={({ style, ...props_ }) => <div {...props_} />}
                renderThumbVertical={({ style, ...props_ }) => <div {...props_} />}
              >
                {defaultDom}
              </Scrollbars>
            );
          }}
          menuDataRender={menuDataRender}
          rightContentRender={() => <RightContent />}
          postMenuData={(menuData) => {
            menuDataRef.current = menuData || [];
            return menuData || [];
          }}
          siderWidth={250}
        >
          <RouteContext.Consumer>
            {(context) => {
              const isAccessable = checkPageAccess(myUser, location.pathname, context.route.routes);
              if (isAccessable) {
                return children;
              }
              return <Redirect to="/dashboard" />;
            }}
          </RouteContext.Consumer>
        </ProLayout>
      )}
    </>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(AdminLayout);
