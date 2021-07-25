/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import moment from 'moment';
import { Card, TablePanel, Row, Col, StartEndDatePicker, Input } from '@/components';
import { asDateTime } from '@/utils/text';
import styles from './HistorySubPage.less';
import { getActionHistoriesApi } from '@/services/userSearch/history';

const HistorySubPage = (props) => {
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 100,
    total: 0,
  });
  const [searchParam, setSearchParam] = useState({
    description: '',
    created_at_range: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
    startDate: moment().subtract(30, 'days'),
    endDate: moment(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: 'Comment',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
      title: 'Performer',
      dataIndex: 'modifier',
      key: 'modifier',
    },
    {
      title: 'Date Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{asDateTime(text)}</span>,
    },
  ];

  const onGetTableData = (data) => {
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total,
    });
    setTableData(data.data);
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const loadTableData = (paginationParam0, searchParam0) => {
    const params = {
      page: paginationParam0.currentPage,
      per_page: paginationParam0.perPage,
      'filter[description]': searchParam.description,
      'filter[created_at_range]': searchParam.created_at_range,
    };
    setIsLoading(true);
    getActionHistoriesApi(props.userId, params, onGetTableData, onFailTableData);
  };

  const onPageChange = (currentPage) => {
    const paginationParam0 = {
      ...paginationParam,
      currentPage,
    };
    loadTableData(paginationParam0, searchParam);
  };

  useEffect(() => {
    if (props.userId) {
      loadTableData(paginationParam, searchParam);
    }
  }, [props.uesrId]);

  return (
    <>
      <Row gutter={[15, 0]} className="history-table">
        <Col xs={24}>
          <TablePanel
            title={t('pages.userSearch.history', 'History')}
            showSearchIcon
            toolbar={
              <div className="toolbar-container">
                <div className="toolbar-sub-container">
                  <Input
                    placeholder="Comment"
                    value={searchParam.description}
                    onChange={(e) =>
                      setSearchParam({
                        ...searchParam,
                        description: e.target.value,
                      })
                    }
                    size="medium"
                    style={{ minWidth: '162px' }}
                  />
                </div>
                <div className="toolbar-sub-container">
                  <StartEndDatePicker
                    startDate={searchParam.startDate}
                    endDate={searchParam.endDate}
                    onChange={(values) => {
                      let startDate0 = '';
                      let endDate0 = '';
                      let createdAtRange = '';
                      if (values) {
                        startDate0 = values[0];
                        endDate0 = values[1];
                        createdAtRange = `${moment(values[0]).format('YYYY-MM-DD')}|${moment(
                          values[1],
                        ).format('YYYY-MM-DD')}`;
                      }
                      setSearchParam({
                        ...searchParam,
                        startDate: startDate0,
                        endDate: endDate0,
                        created_at_range: createdAtRange,
                      });
                    }}
                  />
                </div>
              </div>
            }
            data={tableData}
            columns={columns}
            onPageChange={onPageChange}
            paginationParam={paginationParam}
            loading={isLoading}
            onSearch={() => loadTableData(paginationParam, searchParam)}
          />
        </Col>
      </Row>
    </>
  );
};

export default HistorySubPage;
