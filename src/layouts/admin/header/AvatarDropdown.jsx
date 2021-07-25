import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, Dropdown } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import { t } from '@/utils/label';
import styles from './RightContent.less';
import { getUser, clearUser } from '@/utils/localStorage'

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      clearUser()
    }

    history.push(`/account/${key}`);
  };

  render() {
    const {
      menu,
    } = this.props;
    const myUser = getUser()
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          {t("header.logout", "Log out")}
        </Menu.Item>
      </Menu>
    );
    return myUser ? (
      <Dropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <span>
            <span className={`${styles.name} anticon`}>{`${myUser.first_name} ${myUser.last_name}`}</span><br style={{height: 0}} />
            <span className={'text-secondary'}>{`${myUser.department?myUser.department.name:''}`}</span>
          </span>
          <Avatar className={styles.avatar} src={myUser.image} alt="avatar" />
        </span>
      </Dropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect()(AvatarDropdown);
