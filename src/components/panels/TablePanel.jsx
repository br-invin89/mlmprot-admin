/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Card, Table, OutlineBtn, Checkbox, Dropdown, Menu, Pagination, Spin } from '@/components';
import { SearchOutlined, AlignLeftOutlined } from '@ant-design/icons';
import styles from './TablePanel.less';

export default (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hideColumns, setHideColumns] = useState([]);
  const [columns, setColumns] = useState(props.columns);

  // useEffect(() => {
  //   if (props.showingFor === 'orderHistory' && (columns.length >= props.columns.length)) {
  //     setColumns(props.columns);
  //   } else if (props.showingFor !== 'orderHistory') {
  //     setColumns(props.columns);
  //   }
  // }, [props.columns]);

  useEffect(() => {
    if (props.hideColumns) {
      const columns =
        props.columns &&
        props.columns.filter(function (e) {
          if (props.hideColumns.indexOf(e.key) === -1) {
            return e;
          }
        });
      setColumns(columns);
      setHideColumns(props.hideColumns);
    } else {
      setColumns(props.columns);
    }
  }, [props.hideColumns, props.columns]);

  function onToggleColumnsShows(checked, key) {
    if (checked) {
      // eslint-disable-next-line prefer-const
      let index = hideColumns.indexOf(key);
      if (index !== -1) {
        hideColumns.splice(index, 1);
      }
      // eslint-disable-next-line no-shadow
      // eslint-disable-next-line prefer-const
      let columns =
        props.columns &&
        props.columns.filter(function (e) {
          if (hideColumns.indexOf(e.key) === -1) {
            return e;
          }
        });
      if (props.toggleColumns) {
        props.toggleColumns(hideColumns);
      }
      setColumns(columns);
      setHideColumns(hideColumns);
    } else {
      hideColumns.push(key);
      // eslint-disable-next-line no-shadow
      // eslint-disable-next-line prefer-const
      let columns =
        props.columns &&
        props.columns.filter(function (e) {
          if (hideColumns.indexOf(e.key) === -1) {
            return e;
          }
        });
      if (props.toggleColumns) {
        props.toggleColumns(hideColumns);
      }
      setColumns(columns);
      setHideColumns(hideColumns);
    }
  }

  function handleVisibleChange(flag) {
    setIsVisible(flag);
  }

  const menu = (
    <Menu className={`${styles.headerMenu}`}>
      {props.columns &&
        props.columns.map((col, idx) => {
          return (
            <Menu.Item key={idx} className={`${styles.headerMenuCell}`}>
              <Checkbox
                onChange={(e) => onToggleColumnsShows(e.target.checked, col.key)}
                defaultChecked={hideColumns.indexOf(col.key) === -1}
                className={`${styles.checkboxLabel}`}
                label={col.title}
              />
            </Menu.Item>
          );
        })}
    </Menu>
  );

  // eslint-disable-next-line prefer-const
  let startIndex = props.paginationParam
    ? props.paginationParam.currentPage
      ? (props.paginationParam.currentPage - 1) * props.paginationParam.perPage + 1
      : 0
    : 1;
  let endIndex = props.paginationParam
    ? props.paginationParam.currentPage
      ? props.paginationParam.currentPage * props.paginationParam.perPage
      : 0
    : props.data.length;
  // eslint-disable-next-line prefer-const
  let total = props.paginationParam ? props.paginationParam.total : props.data.length;
  if (endIndex > total) {
    endIndex = total;
  }

  return (
    <Card
      className={`${styles.tableCard} ${
        props.showFiltersLarge
          ? 'lg-filters'
          : props.showFiltersMedium
          ? 'md-filters'
          : 'sm-filters'
      }`}
    >
      {!props.hideTopHeader && (
        <div
          className={
            props.showFiltersLarge
              ? `${styles.headLineLgFilters}`
              : props.showFiltersMedium
              ? `${styles.headLineMdFilters}`
              : `${styles.headLine} ${props?.toolbar?.props?.className} ${props?.headerTabs?.props?.className}`
          }
          style={{
            padding: props.headerTabs ? '0px 24px' : props.toolbar ? '10px 24px' : '15px 24px',
          }}
        >
          <h4 className={`${styles.title} tab-panel-title`}>
            {props.headerTabs ? props.headerTabs : props.title}
          </h4>
          <div className={`${styles.toolbar} tool-bar`}>
            {props.toolbar ? props.toolbar : ''}
            <div className={`${props.showHeaderIcon && styles.searchMenuBtn}`}>
              {props.showSearchIcon && (
                <div className="table-panel-search-btn ml-10">
                  <OutlineBtn className="btn-34" icon={<SearchOutlined />} onClick={props.onSearch}>
                    Search
                  </OutlineBtn>
                </div>
              )}
              {props.showHeaderIcon && (
                <Dropdown
                  className="tab-menu-icon"
                  overlay={menu}
                  trigger={['click']}
                  onVisibleChange={handleVisibleChange}
                  visible={isVisible}
                >
                  <div className={`${styles.headerIcon}`}>
                    <AlignLeftOutlined />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      )}
      {props.chart && (
        <div className={`${styles.chartSpace}`}>
          {props.loading ? <Spin spinning={true} /> : props.chart}
        </div>
      )}
      {props.statsCard && <div className={`${styles.statsCardSpace}`}>{props.statsCard}</div>}
      <div className={`${styles.tableWrapper}`}>
        <Table
          columns={columns}
          dataSource={props.data}
          pagination={false}
          style={props.style}
          className={styles.tableWithPadding}
          loading={{
            spinning: props.loading || false,
            indicator: <Spin spinning={true} className={styles.spinner} />,
          }}
        />
      </div>
      {props.paginationParam ? (
        // eslint-disable-next-line react/jsx-no-undef
        <div className={`${styles.tablePagination}`}>
          <Card ghost colSpan={{ sm: 10 }} className={`${styles.pagContainer}`}>
            <div className={`${styles.showingContainer}`}>
              {props.data && props.data.length > 0 && (
                <span>
                  Showing Results {startIndex}-{endIndex} of {total}
                </span>
              )}
            </div>
          </Card>
          <Card ghost colSpan={{ sm: 14 }} className={`${styles.pagContainer}`}>
            <div className={`${styles.paginationContainer}`}>
              <Pagination
                current={props.paginationParam.currentPage}
                pageSize={props.paginationParam.perPage}
                total={props.paginationParam.total}
                showSizeChanger={false}
                onChange={props.onPageChange}
                hideOnSinglePage={true}
              />
            </div>
          </Card>
        </div>
      ) : !props.hideTopHeader && props.data && props.paginationParam && props.data.length > 0 ? (
        <div className={`${styles.tablePagination}`}>
          <div className={`${styles.showingContainer}`}>
            {props.data && props.data.length > 0 && (
              <span>
                Showing Results {startIndex}-{endIndex} of {total}
              </span>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </Card>
  );
};
