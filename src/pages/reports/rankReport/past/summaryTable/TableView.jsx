/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { TablePanel, message, Tooltip } from '@/components';
import TableHead from './TableHead';
import { asDate } from '@/utils/text';
import { t } from '@/utils/label';

export default function TableView(props) {
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (text, record) => {
        return (
          <span>
            <Link style={{ textDecoration: 'underline' }} to={`/user/detail/${record.id}`}>
              {record.uuid}
            </Link>
          </span>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => <span>{`${record?.first_name} ${record?.last_name}`}</span>,
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (_, record) => (
        <Tooltip placement="bottom" title={record.rank?.description}>
          <span>{record.rank?.name}</span>,
        </Tooltip>
      ),
    },
    {
      title: 'Left PV',
      dataIndex: 'left_pv',
      key: 'left_pv',
      render: (_, record) => <span>{record.qualification?.left_pv}</span>,
    },
    {
      title: 'Right PV',
      dataIndex: 'right_pv',
      key: 'right_pv',
      render: (_, record) => <span>{record.qualification?.right_pv}</span>,
    },
    {
      title: 'Left CV',
      dataIndex: 'left_cv',
      key: 'left_cv',
      render: (_, record) => <span>{record.qualification?.left_cv}</span>,
    },
    {
      title: 'Right CV',
      dataIndex: 'right_cv',
      key: 'right_cv',
      render: (_, record) => <span>{record.qualification?.right_cv}</span>,
    },
    {
      title: 'Left Carry Over',
      dataIndex: 'left_carry_over',
      key: 'left_carry_over',
      render: (_, record) => <span>{record.qualification?.left_carry_over}</span>,
    },
    {
      title: 'Right Carry Over',
      dataIndex: 'right_carry_over',
      key: 'right_carry_over',
      render: (_, record) => <span>{record.qualification?.right_carry_over}</span>,
    },
    {
      title: 'Left Brand Partners',
      dataIndex: 'left_brand_partners',
      key: 'left_brand_partners',
      render: (_, record) => <span>{record.qualification?.left_brand_partners}</span>,
    },
    {
      title: 'Right Brand Partners',
      dataIndex: 'right_brand_partners',
      key: 'right_brand_partners',
      render: (_, record) => <span>{record.qualification?.right_brand_partners}</span>,
    },
    {
      title: 'Ranked At',
      dataIndex: 'ranked_at',
      key: 'ranked_at',
      render: (text) => <span>{asDate(text)}</span>,
    },
  ];

  const onSearch = () => {
    if (
      (props.searchParam.current_rank &&
        props.searchParam.current_rank.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.left_pv &&
        props.searchParam.left_pv.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.right_pv &&
        props.searchParam.right_pv.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.left_cv &&
        props.searchParam.left_cv.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.right_cv &&
        props.searchParam.right_cv.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.left_carry_over &&
        props.searchParam.left_carry_over.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.right_carry_over &&
        props.searchParam.right_carry_over.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.left_brand_partners &&
        props.searchParam.left_brand_partners.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.right_brand_partners &&
        props.searchParam.right_brand_partners.split('|').filter((e) => e).length === 1)
    ) {
      message.error('Please Enter Correct Start and End Range');
      return;
    }
    let params = {
      ...props.searchParam,
      current_rank: props.searchParam.current_rank === '|' ? '' : props.searchParam.current_rank,
      left_pv: props.searchParam.left_pv === '|' ? '' : props.searchParam.left_pv,
      right_pv: props.searchParam.right_pv === '|' ? '' : props.searchParam.right_pv,
      left_cv: props.searchParam.left_cv === '|' ? '' : props.searchParam.left_cv,
      right_cv: props.searchParam.right_cv === '|' ? '' : props.searchParam.right_cv,
      left_carry_over:
        props.searchParam.left_carry_over === '|' ? '' : props.searchParam.left_carry_over,
      right_carry_over:
        props.searchParam.right_carry_over === '|' ? '' : props.searchParam.right_carry_over,
      left_brand_partners:
        props.searchParam.left_brand_partners === '|' ? '' : props.searchParam.left_brand_partners,
      right_brand_partners:
        props.searchParam.right_brand_partners === '|'
          ? ''
          : props.searchParam.right_brand_partners,
    };
    if (checkValues(params)) {
      const paginationParam = { ...props.paginationParam, currentPage: 1 };
      props.loadTable(paginationParam, params);
    }
  };

  const onPageChange = (page) => {
    let params = {
      ...props.searchParam,
      current_rank: props.searchParam.current_rank === '|' ? '' : props.searchParam.current_rank,
      left_pv: props.searchParam.left_pv === '|' ? '' : props.searchParam.left_pv,
      right_pv: props.searchParam.right_pv === '|' ? '' : props.searchParam.right_pv,
      left_cv: props.searchParam.left_cv === '|' ? '' : props.searchParam.left_cv,
      right_cv: props.searchParam.right_cv === '|' ? '' : props.searchParam.right_cv,
      left_carry_over:
        props.searchParam.left_carry_over === '|' ? '' : props.searchParam.left_carry_over,
      right_carry_over:
        props.searchParam.right_carry_over === '|' ? '' : props.searchParam.right_carry_over,
      left_brand_partners:
        props.searchParam.left_brand_partners === '|' ? '' : props.searchParam.left_brand_partners,
      right_brand_partners:
        props.searchParam.right_brand_partners === '|'
          ? ''
          : props.searchParam.right_brand_partners,
    };
    if (checkValues(params)) {
      const paginationParam = { ...props.paginationParam, currentPage: page };
      props.loadTable(paginationParam, params);
    }
  };

  const checkValues = (values) => {
    let error = false;
    let el = Object.values(values);
    el &&
      el.map((v) => {
        if (v && v !== '|') {
          v.split('|').map((range_value) => {
            if (Number(range_value) <= 0) {
              message.error('Should be greater than 0');
              error = true;
            }
          });
        }
      });
    return !error;
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.past', 'Past')}
      toolbar={<TableHead searchParam={props.searchParam} setSearchParam={props.setSearchParam} />}
      showFiltersLarge
      applyPadding
      showSearchIcon
      columns={columns}
      loading={props.isLoading}
      onSearch={onSearch}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
    />
  );
}
