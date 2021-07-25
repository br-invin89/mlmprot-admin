import { Input, Select } from 'antd';
import styles from './Input.less';

export const SelectRange = ({
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
  startOptions,
  endOptions,
  ...props
}) => {
  return (
    <>
      <Input.Group compact className={`${className} ${styles.input}`} style={{ display: 'flex' }}>
        <Select
          type={type}
          value={startValue}
          onChange={onStartChange}
          options={startOptions}
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
        <Select
          className={`${className} site-input-right ${styles.input}`}
          onChange={onEndChange}
          name={endName}
          options={endOptions}

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
