import { PageContainer as PageContainer_ } from '@ant-design/pro-layout'
import styles from './PageContainer.less'

export default (props) => {
  return (
    <PageContainer_ 
      ghost
      header={{
        title: ''
      }}
      className={styles.container}
      {...props}
    />
  )
}
