import React, { useState } from 'react'
import { PageContainer } from '@/components'
import SubMenu from './SubMenu'
import SettingsSubPage from './settings/SettingsSubPage'
import MenusSubPage from './menus/MenusSubPage'

export default () => {
  const [tab, setTab] = useState('settings')
  
  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} />
      {tab==='settings'?<SettingsSubPage />:''}
      {tab==='menus'?<MenusSubPage />:''}
    </PageContainer>
  )
}