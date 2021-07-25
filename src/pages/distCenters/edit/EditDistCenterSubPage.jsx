import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { PageContainer } from '@/components';
import SubMenu from './SubMenu';
import BatchesSubPage from './batches/BatchesSubPage'
import ShippingGroupsSubPage from './ShippingGroupsSubPage'
import UploadShippmentsSubPage from './uploadShippment/UploadShippmentsSubPage'
import DetailsSubPage from './DetailsSubPage'

const EditDistCentersSubPage = ({ history }) => {
  const [tab, setTab] = useState('Batches');
  
  const distCenterId = history.location.query && history.location.query.id
  useEffect(() => {
    if (!history.location.query.id) {
      history.push('/dist-centers')
    }
  }, [])
  
  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} />
      {tab === 'Batches' && <BatchesSubPage distCenterId={distCenterId}/>}
      {tab === 'Upload  Shippments' && <UploadShippmentsSubPage distCenterId={distCenterId}/>}
      {tab === 'Shipping Groups' && <ShippingGroupsSubPage distCenterId={distCenterId}/>}
      {tab === 'Details' && <DetailsSubPage distCenterId={distCenterId}/>}
    </PageContainer>
  );
};

export default withRouter(EditDistCentersSubPage);
