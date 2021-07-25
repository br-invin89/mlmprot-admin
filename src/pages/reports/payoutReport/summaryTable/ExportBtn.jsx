import React from 'react';
import { OutlineBtn } from '@/components';

export default function ExportBtn(props) {
  const openCsv = () => {
    if (props.csv) {
      window.open(props.csv, '_blank');
    }
  };

  return (
    <OutlineBtn success onClick={openCsv} disabled={!props.csv}>
      {props.label}
    </OutlineBtn>
  );
}
