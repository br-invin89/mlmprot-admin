import styles from './Spin.less'
import ScaleLoader from 'react-spinners/ScaleLoader'

export const Spin = (props) => {
  return (
    props.spinning?
    <div className={`${styles.container} ${props.className}`}>
      <ScaleLoader className={'r'} size={150} loading={true} {...props.spinProps} />
      {props.description?
        <p className={styles.description}>{props.description}</p>
      : ''}
    </div>
    : ''
  )
}
