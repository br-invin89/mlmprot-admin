/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, TablePanel, Row, Col, UserStatusBadge, UserTypeBadge } from '@/components';
import { varLabel } from '@/common/var';
import { asDate } from '@/utils/text';
import { getPersonalEnrolleesApi } from '@/services/userSearch/personalEnrollee';
import { tLabel } from '@/utils/label';

export default function PersonalEnrolleesSubPage(props) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (text, data) => <Link to={`/user/detail/${data.id}`} style={{textDecoration: 'underline'}}>{text}</Link>,
    },
    {
      title: 'Name',
      render: (_, data) => <span>{`${data.first_name} ${data.last_name}`}</span>,
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Type',
      render: (type) => <UserTypeBadge type={varLabel('user.type', type)} />,
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Leg',
      render: (text) => <span>{varLabel('user.legPosition', text)}</span>,
      key: 'leg_position',
      dataIndex: 'leg_position',
    },
    {
      title: 'Status',
      render: (text) => <UserStatusBadge status={varLabel('user.status', text)} />,
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Registered On',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (text) => <span>{asDate(text)}</span>,
    },
  ];

  const onGetTableData = (data) => {
    setTableData(data.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total,
    });
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const loadTableData = (paginationParam0) => {
    setIsLoading(true);
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
    };
    getPersonalEnrolleesApi(props.userId, params, onGetTableData, onFailTableData);
  };

  const onPageChange = (currentPage) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage,
    };
    loadTableData(paginationParam0);
  };

  useEffect(() => {
    if (props.userId) {
      loadTableData(paginationParam);
    }
  }, [props.userId]);

  return (
    <>
      <Row gutter={[15, 0]} className="personal-enrollees-table">
        <Col xs={24}>
          <TablePanel
            data={tableData}
            title={`${tLabel('pages.userSearch.personalEnrollees', 'Personal Enrollees')} 
            (${paginationParam.total})`}
            columns={columns}
            onPageChange={onPageChange}
            paginationParam={paginationParam}
            loading={isLoading}
          />
        </Col>
      </Row>
    </>
  );
}
