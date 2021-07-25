/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { OutlineBtn } from '@/components';

function Toolbar(props) {
  const goBack = () => {
    props.history.push('/order/search');
  }
  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <OutlineBtn className="btn-34" onClick={goBack}>
          Go Back
        </OutlineBtn>
      </div>
    </div>
  );
}

export default withRouter(Toolbar);
