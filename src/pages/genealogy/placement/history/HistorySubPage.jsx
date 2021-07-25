/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  PageContainer,
  Button,
  Card,
  SuccessNotification,
  AutoComplete,
  message,
  Popconfirm,
} from '@/components';
import { searchUsersByIdApi } from '@/services/common';
import { getPastPlacementGenealogyApi } from '@/services/genealogy/placement';
import styles from '../GenealogyPage.less';
import TableView from './TableView';

const { Option } = AutoComplete;

export default function HistorySubPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });

  const onGetGealogy = (data) => {
    setIsLoading(false);
    const tableData0 = data.data.map((el) => ({
      user_id: el.user_id,
      user_uuid: el.user.uuid,
      name: `${el.user.first_name} ${el.user.last_name}`,
      username: el.user.username,
      placement_id: el.placement_id,
      placement_uuid: el.placement.uuid,
      placement_name: `${el.placement.first_name} ${el.placement.last_name}`,
      status: el.status,
      admin_name: `${el.admin_name}`,
      created_at: `${el.created_at}`,
      comment: `${el.comment}`,
    }));
    setTableData(tableData0);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total,
    });
  };

  const onFailGetGenealogy = () => {
    setIsLoading(false);
  };

  const loadTable = (paginationParam0) => {
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    };
    setIsLoading(true);
    getPastPlacementGenealogyApi(params, onGetGealogy, onFailGetGenealogy);
  };

  useEffect(() => {
    loadTable(paginationParam);
  }, []);

  return (
    <div>
      <Row style={{ marginBottom: 20 }}>
        <Col xs={24} className={styles.merchantsTable}>
          <TableView
            tableData={tableData}
            isLoading={isLoading}
            paginationParam={paginationParam}
            setPaginationParam={setPaginationParam}
            loadTable={loadTable}
          />
        </Col>
      </Row>
    </div>
  );
}
