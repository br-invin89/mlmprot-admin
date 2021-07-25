/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { PageContainer, SuccessNotification } from '@/components';
import { getDistCentersApi, changeDistCenterStatusApi } from '@/services/distCenters';
import DistCentersHeader from './DistCentersHeader';
import DistCentersCardView from './DistCentersCardView';

const DistCentersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [distCenterId, setDistCenterId] = useState(null);
  const [open, setOpen] = useState(false);

  const [searchParam, setSearchParam] = useState({
    country: '',
  });
  const [distCenterData, setDistCenterData] = useState([]);

  const toggle = () => {
    setOpen(!open);
  };

  const loadCards = (searchParam_) => {
    setIsLoading(true);
    const params = {
      country: searchParam_.country,
    };
    getDistCentersApi(params, onGetDistCentersList, onFailDistCentersList);
  };

  const onGetDistCentersList = (data) => {
    setDistCenterData(data.data);
    setIsLoading(false);
  };

  const onFailDistCentersList = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    loadCards(searchParam);
  }, []);

  const changeDistCenterStatus = (id, status) => {
    setIsLoadingStatus(true);
    setDistCenterId(id);
    const query = {
      status
    }
    changeDistCenterStatusApi(id, query, onStatusSuccess, onStatusFail);
  };

  const onStatusSuccess = (data) => {
    setDistCenterId(null);
    loadCards(searchParam);
    SuccessNotification(data.message);
    setIsLoadingStatus(false);
  };

  const onStatusFail = () => {
    setDistCenterId(null);
    setIsLoadingStatus(false);
  };

  return (
    <PageContainer>
      <DistCentersHeader
        total={(distCenterData && distCenterData.length) || 0}
        setSearchParam={setSearchParam}
        loadCards={loadCards}
        searchParam={searchParam}
        open={open}
        toggle={toggle}
      />
      <DistCentersCardView
        isLoading={isLoading}
        data={distCenterData}
        changeDistCenterStatus={changeDistCenterStatus}
        isLoadingStatus={isLoadingStatus}
        distCenterId={distCenterId}
      />
    </PageContainer>
  );
};

export default DistCentersPage;
