import { Link } from 'react-router-dom';
import styles from './UserAvatar.less';
import { ReactComponent as NophotoIcon } from '@/assets/icons/user.svg';

const UserAvatar = (props) => {
  return (
    <div className={`${styles.container}`}>
      {props.image ? (
        <img
          className={`${styles.imageContainer}`}
          src={props.image}
          width={props.width || 35}
          height={props.height || 35}
          alt=""
        />
      ) : (
        <NophotoIcon className={`${styles.imageContainer}`} />
      )}
      {props.link ? <Link to={props.link}>{props.title}</Link> : <span>{props.title}</span>}
    </div>
  );
};

export default UserAvatar;
