/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Row, Col } from '@/components';
import { getUploadShippmentsApi, getUploadedFilepi } from '@/services/distCenters';
import TableView from './summaryTable/TableView';

const UploadShippmentsSubPage = ({ distCenterId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [uploadShippmentId, setUploadShippmentId] = useState(null);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [tableData, setTableData] = useState([]);

  const loadTable = (paginationParam_) => {
    setIsLoading(true);
    const params = {
      page: paginationParam_.currentPage,
      per_page: paginationParam_.perPage,
    };
    getUploadShippmentsApi(
      distCenterId,
      params,
      onGetUploadShippmentList,
      onFailUploadShippmentList,
    );
  };

  const onGetUploadShippmentList = (data) => {
    setTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailUploadShippmentList = () => {
    setIsLoading(false);
  };

  const getUploadedFile = (id) => {
    setIsLoadingFile(true);
    setUploadShippmentId(id);
    getUploadedFilepi(id, onUploadFileSuccess, onUploadFileFail);
  };

  const onUploadFileSuccess = (data) => {
    setUploadShippmentId(null);
    const element = document.createElement("a");
    const file = new Blob([data], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "shippment.txt";
    document.body.appendChild(element);
    element.click();
    setIsLoadingFile(false);
  };

  const onUploadFileFail = () => {
    setUploadShippmentId(null);
    setIsLoadingFile(false);
  };


  useEffect(() => {
    loadTable(paginationParam);
  }, []);

  return (
    <>
      <Row gutter={[15, 15]} >
        <Col xs={24}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            distCenterId={distCenterId}
            loadTable={loadTable}
            getUploadedFile={getUploadedFile}
            uploadShippmentId={uploadShippmentId}
            isLoadingFile={isLoadingFile}
          />
        </Col>
      </Row>
    </>
  );
};

export default UploadShippmentsSubPage;
