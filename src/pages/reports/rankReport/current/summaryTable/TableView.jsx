/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { TablePanel, message, Tooltip } from '@/components';
import TableHead from './TableHead';
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
      title: 'Current Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (_, record) => (
        <Tooltip placement="bottom" title={record.rank?.description}>
          <span>{record.rank?.name}</span>,
        </Tooltip>
      ),
    },
    // {
    //   title: 'Next Month Rank',
    //   dataIndex: 'next_month_rank',
    //   key: 'next_month_rank',
    //   render: (_, record) => (
    //     <Tooltip placement="bottom" title={record.next_month_rank?.description}>
    //       <span>{record.next_month_rank?.name}</span>
    //     </Tooltip>
    //   ),
    // },
    {
      title: 'Next Rank',
      dataIndex: 'next_rank',
      key: 'next_rank',
      render: (_, record) => (
        <Tooltip placement="bottom" title={record.next_rank?.description}>
          <span>{record.next_rank?.name}</span>,
        </Tooltip>
      ),
    },

    {
      title: 'PV',
      dataIndex: 'pv',
      key: 'pv',
      render: (_, record) => <span>{record.qualification?.pv}</span>,
    },
    {
      title: 'GV',
      dataIndex: 'gv',
      key: 'gv',
      render: (_, record) => <span>{record.qualification?.gv}</span>,
    },
    {
      title: 'AM',
      dataIndex: 'am',
      key: 'am',
      render: (_, record) => <span>{record.qualification?.am}</span>,
    },
    {
      title: 'Leg 2.5k',
      dataIndex: 'leg_2k5',
      key: 'leg_2k5',
      render: (_, record) => <span>{record.qualification?.leg_2k5}</span>,
    },
    {
      title: 'Leg 7.5',
      dataIndex: 'leg_7k5',
      key: 'leg_7k5',
      render: (_, record) => <span>{record.qualification?.leg_7k5}</span>,
    },
    {
      title: 'Leg 10k',
      dataIndex: 'leg_10k',
      key: 'leg_10k',
      render: (_, record) => <span>{record.qualification?.leg_10k}</span>,
    },
    {
      title: 'Leg 25k',
      dataIndex: 'leg_25k',
      key: 'leg_25k',
      render: (_, record) => <span>{record.qualification?.leg_25k}</span>,
    },
  ];

  const onSearch = () => {
    if (
      (props.searchParam.rank_range &&
        props.searchParam.rank_range.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.pv_range &&
        props.searchParam.pv_range.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.gv_range &&
        props.searchParam.gv_range.split('|').filter((e) => e).length === 1) ||
      (props.searchParam.am_range &&
        props.searchParam.am_range.split('|').filter((e) => e).length === 1)
      //    ||
      // (props.searchParam.right_cv &&
      //   props.searchParam.right_cv.split('|').filter((e) => e).length === 1) ||
      // (props.searchParam.left_carry_over &&
      //   props.searchParam.left_carry_over.split('|').filter((e) => e).length === 1) ||
      // (props.searchParam.right_carry_over &&
      //   props.searchParam.right_carry_over.split('|').filter((e) => e).length === 1) ||
      // (props.searchParam.left_brand_partners &&
      //   props.searchParam.left_brand_partners.split('|').filter((e) => e).length === 1) ||
      // (props.searchParam.right_brand_partners &&
      //   props.searchParam.right_brand_partners.split('|').filter((e) => e).length === 1)
    ) {
      message.error('Please Enter Correct Start and End Range');
      return;
    }
    const params = {
      rank_range: props.searchParam.rank_range === '|' ? '' : props.searchParam.rank_range,
      pv_range: props.searchParam.pv_range === '|' ? '' : props.searchParam.pv_range,
      gv_range: props.searchParam.gv_range === '|' ? '' : props.searchParam.gv_range,
      am_range: props.searchParam.am_range === '|' ? '' : props.searchParam.am_range,
      // right_cv: props.searchParam.right_cv === '|' ? '' : props.searchParam.right_cv,
      // left_carry_over:
      //   props.searchParam.left_carry_over === '|' ? '' : props.searchParam.left_carry_over,
      // right_carry_over:
      //   props.searchParam.right_carry_over === '|' ? '' : props.searchParam.right_carry_over,
      // left_brand_partners:
      //   props.searchParam.left_brand_partners === '|' ? '' : props.searchParam.left_brand_partners,
      // right_brand_partners:
      //   props.searchParam.right_brand_partners === '|'
      //     ? ''
      //     : props.searchParam.right_brand_partners,
    };
    if (checkValues(params)) {
      const params0 = {
        ...params,
        uuid: props.searchParam.uuid,
      };
      const paginationParam = { ...props.paginationParam, currentPage: 1 };
      props.loadTable(paginationParam, params0);
    }
  };

  const onPageChange = (page) => {
    const params = {
      rank_range: props.searchParam.rank_range === '|' ? '' : props.searchParam.rank_range,
      pv_range: props.searchParam.pv_range === '|' ? '' : props.searchParam.pv_range,
      gv_range: props.searchParam.gv_range === '|' ? '' : props.searchParam.gv_range,
      am_range: props.searchParam.am_range === '|' ? '' : props.searchParam.am_range,
      // right_cv: props.searchParam.right_cv === '|' ? '' : props.searchParam.right_cv,
      // left_carry_over:
      //   props.searchParam.left_carry_over === '|' ? '' : props.searchParam.left_carry_over,
      // right_carry_over:
      //   props.searchParam.right_carry_over === '|' ? '' : props.searchParam.right_carry_over,
      // left_brand_partners:
      //   props.searchParam.left_brand_partners === '|' ? '' : props.searchParam.left_brand_partners,
      // right_brand_partners:
      //   props.searchParam.right_brand_partners === '|'
      //     ? ''
      //     : props.searchParam.right_brand_partners,
    };
    if (checkValues(params)) {
      const params0 = {
        ...params,
        uuid: props.searchParam.uuid,
      };
      const paginationParam = { ...props.paginationParam, currentPage: page };
      props.loadTable(paginationParam, params0);
    }
  };

  const checkValues = (values) => {
    let error = false;
    const el = Object.values(values);
    if (el)
      el.forEach((v) => {
        if (v && v !== '|') {
          v.split('|').forEach((rangeValue) => {
            if (Number(rangeValue) <= 0) {
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
      title={'Rank Report'}
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
