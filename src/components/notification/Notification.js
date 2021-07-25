import { notification as notification_ } from 'antd'

export function notification({type, ...props}) {
  notification_[type]({
    ...props
  })
}


export function SuccessNotification(description) {
  notification({message: 'Success', description, type: 'success'})
}
export function ErrorNotification(description) {
  notification({message: 'Error', description, type: 'error'})
}
export function InfoNotification(description) {
  notification({message: 'Info', description, type: 'info'})
}
export function WarningNotification(description) {
  notification({message: 'Warning', description, type: 'warning'})
}

