import React, { useState } from 'react'
import { 
  Card, Input, StartEndDatePicker, Button, message,
} from '@/components'
import moment from 'moment'
import styles from './OrgVolumeReportPage.less'
import { exportOrgVolumeApi } from '@/services/reports/orgVolume'

export default function SearchForm() {
  const [formData, setFormData] = useState({
    uuid: '', startDate: '', endDate: ''
  })
  const [isExporting, setIsExporting] = useState(false)

  const onChangeDate = (v) => {
    if (v) {
      setFormData({
        ...formData,
        startDate: v[0], endDate: v[1]
      })
    } else {
      setFormData({
        ...formData,
        startDate: '', endDate: ''
      })
    }
  }

  const onDoneExport = (data) => {
    setIsExporting(false)
    window.open(data.csv_file, '_blank')
  }
  const onFailExport = () => {
    setIsExporting(false)
  }

  const handleExport = () => {
    if (!formData.uuid || !formData.startDate || !formData.endDate) {
      message.error('Please input all required fields')
      return
    }
    setIsExporting(true)
    const params = {
      uuid: formData.uuid,
      date_range: `${moment(formData.startDate).format('YYYY-MM-DD')}|${moment(formData.endDate).format('YYYY-MM-DD')}`
    }
    exportOrgVolumeApi(params, onDoneExport, onFailExport)
  }

  return (
    <Card>
      <div className={styles.formRoot}>
        <div className={styles.formGroup}>
          <label>User UUID:</label>
          <Input className={styles.formControl}
            value={formData.uuid}
            onChange={e=>setFormData({...formData, uuid: e.target.value })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Date Range:</label>
          <StartEndDatePicker 
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChange={onChangeDate}
          />
        </div>
        <div className={styles.formAction}>
          <Button onClick={handleExport} loading={isExporting}>
            Export CSV
          </Button>
        </div>
      </div>
    </Card>
  )
}
