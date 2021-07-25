/* eslint-disable no-unused-vars */
import React from "react"
import logoImage from "@/assets/images/Long-Dark.png"
import styles from './ComingSoon.less'

const ComingSoon = props => {
  return (
    <div className="empty-component-wrapper">
      <div className="container">
          <img src={logoImage} alt="" style={{ height: 100 }} />
          <span className="coming-soon-text">
            {props.content?
              props.content:
              'COMING SOON'
            }
          </span>
      </div>
    </div >
  )
}

export default ComingSoon
