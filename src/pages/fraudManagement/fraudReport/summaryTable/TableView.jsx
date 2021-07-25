/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { t } from '@/utils/label';
import { TablePanel, Popconfirm, OutlineBtn, message } from '@/components';
import { countryName } from '@/utils/country';
import TableHead from './TableHead';

export default function TableView(props) {

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return (
          <span>
            <Link style={{ textDecoration: 'underline' }} to={`/user/detail/${text}`}>
              {record.uuid}
            </Link>
          </span>
        );
      },
    },
    {
      title: 'Risk Score',
      dataIndex: 'risk_score',
      key: 'risk_score',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <span>{`${record.first_name} ${record.last_name}`}</span>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'CC Country',
      dataIndex: 'billing_detail',
      key: 'billing_detail',
      render: (_, record) => (
        <span>{record.billing_detail && countryName(record.billing_detail.billing_country)}</span>
      ),
    },
    {
      title: 'First Order IP',
      dataIndex: 'first_order_ip',
      key: 'first_order_ip',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <span>
          <Popconfirm
            title={'Are you sure ?'}
            onConfirm={() => props.resetRiskScore(id)}
            okText="Yes"
            placement="top"
            cancelText="No"
          >
            <OutlineBtn loading={props.isLoadingReset && id === props.fraudId}>
              Reset Risk Score
            </OutlineBtn>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.fraudReport','Fraud Report')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={props.loadTable}
          setPaginationParam={props.setPaginationParam}
        />
      }
      applyPadding
      columns={columns}
      showFiltersLarge
      showSearchIcon
      onSearch={() => {
        if (props.searchParam.risk_score_min && !props.searchParam.risk_score_max) {
          message.error("Please enter max value")
        } else if (props.searchParam.risk_score_max && !props.searchParam.risk_score_min) {
          message.error("Please enter min value")
        } else if (props.searchParam.risk_score_min > props.searchParam.risk_score_max) {
          message.error("Min value can not be greater than max value")
        } else {
          const paginationParam = { ...props.paginationParam, currentPage: 1 };
          props.loadTable(paginationParam, props.searchParam);
        }
      }}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
