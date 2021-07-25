/* eslint-disable react/no-array-index-key */
import React from "react"
import styles from './Tabs.less'

const Tabs = ({ selectedTab, switchTab, tabsList }) => {
  return (
    <div className={`${styles.tabsContainer}`}>
      {tabsList.map((tab, i) => (
        <li
          className={tab === selectedTab ? `${styles.selected}` : ""}
          onClick={() => switchTab(tab)}
          key={i}
        >
          {tab}
        </li>
      ))}
    </div>
  )
}

export default Tabs
