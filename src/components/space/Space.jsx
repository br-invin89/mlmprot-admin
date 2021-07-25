import { Space as Space_ } from 'antd'
import styles from './Space.less'

export function Space({...props}) {
  return (
    <Space_ size={15} {...props} className={`${styles.container} ${styles.className}`} />
  )
}
