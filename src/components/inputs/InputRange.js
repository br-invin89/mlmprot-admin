import { Input } from 'antd';
import styles from './Input.less';

export const InputRange = ({
  startPlaceholder,
  endPlaceholder,
  error,
  className,
  onStartChange,
  onEndChange,
  type,
  startName,
  endName,
  startValue,
  endValue,
  ...props
}) => {
  return (
    <>
      <Input.Group compact className={`${className} ${styles.input}`} style={{ display: 'flex' }}>
        <Input
          type={type}
          value={startValue}
          onChange={onStartChange}
          name={startName}
          style={{ width: '45%', textAlign: 'center' }}
          placeholder={startPlaceholder || 'Min'}
          className={`${className} ${styles.input}`}
        />
        <Input
          className={`${className} site-input-split ${styles.input}`}
          style={{
            width: '10%',
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
          }}
          placeholder="~"
          disabled
        />
        <Input
          className={`${className} site-input-right ${styles.input}`}
          onChange={onEndChange}
          name={endName}
          style={{
            width: '45%',
            textAlign: 'center',
          }}
          placeholder={endPlaceholder || 'Max'}
          type={type}
          value={endValue}
        />
      </Input.Group>

      {error && <span className="error">{error}</span>}
    </>
  );
};
