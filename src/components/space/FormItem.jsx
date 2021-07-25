import styles from './FormItem.less';

export function FormItem(props) {
  return (
    <div className={styles.container}>
      <div className={styles.label}><label>{props.label}</label></div>
      {props.children}
      {props.errorMessages && props.errorMessages.length > 0 && (
        <div className={styles.errorWrapper}>
          {props.errorMessages.map((el, index) => (
            <p key={index}>{el.message}</p>
          ))}
        </div>
      )}
    </div>
  );
}
