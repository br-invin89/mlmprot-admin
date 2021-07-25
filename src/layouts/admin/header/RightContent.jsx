import React, { useEffect } from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './RightContent.less';

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  useEffect(() => {}, []);

  return (
    <div className={className}>
      <Avatar />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
