/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { asPrice } from '@/utils/text';

export default function Toolbar(props) {
  return (
    <div className="toolbar-container-for-lg-filters">
      <div className={`toolbar-sub-container`}>
        <span>Current Amount:&nbsp;{asPrice(props.amount)}</span>
      </div>
    </div>
  );
}
