import { Button } from 'antd'
import styles from './ButtonGroup.less';

const ButtonGroup = (props) => {
  return (
      props.actions.map((action) => (
        <Button
          type="primary"
          key={action.label}
          size={'small'}
          className={`${styles.actionBtn} ${
            action.isSelected ? '' : styles.btnInverse
          }`}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))
  );
}

export default ButtonGroup;