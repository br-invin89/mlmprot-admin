/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ButtonGroup } from '@/components';
import styles from '../UsStatesRevenuePage.less';

export default function TableHead(props) {
  const [type, setType] = useState('weekly');

  const changCountryType = (selectedType) => {
    const searchParam = { mode: selectedType };
    props.setSearchParam(searchParam);
    props.loadTable(searchParam);
    setType(selectedType);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <ButtonGroup
          actions={[
            {
              label: 'Weekly',
              onClick: () => changCountryType('weekly'),
              isSelected: type === 'weekly',
            },
            {
              label: 'Monthly',
              onClick: () => changCountryType('monthly'),
              isSelected: type === 'monthly',
            },
            {
              label: 'Yearly',
              onClick: () => changCountryType('yearly'),
              isSelected: type === 'yearly',
            },
          ]}
        />
      </div>
    </div>
  );
}
