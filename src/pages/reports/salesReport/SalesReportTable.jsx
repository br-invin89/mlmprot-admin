/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { StartEndDatePicker, OutlineBtn, Select, TablePanel } from '@/components';
import { getDailySalesApi, getDailySalesExportApi } from '@/services/reports/salesReport';
import { getProductApi } from '@/services/products/product';
import { t } from '@/utils/label';
import { asPrice, asDate } from '@/utils/text';
import styles from './SalesReportPage.less';

const SalesReportTable = () => {
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const [filterProduct, setFilterProduct] = useState('');
  const [filterDate, setFilterDate] = useState({
    startDate: moment().subtract(30, 'days'),
    endDate: moment(),
    date: `${moment().subtract(30, 'days').format("YYYY-MM-DD")}|${moment().format("YYYY-MM-DD")}`,
  });

  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const [salesReportTableData, setSalesReportTableData] = useState([]);
  const [productsList, setProductList] = useState([]);

  const getSalesReportList = (params) => {
    setIsLoadingTable(true);
    getDailySalesApi(params, onGetSuccessSalesReport, onGetFailedSalesReport);
  };

  const onGetSuccessSalesReport = (data) => {
    setSalesReportTableData(data.data);
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setIsLoadingTable(false);
  };

  const onGetFailedSalesReport = () => {
    setIsLoadingTable(false);
  };

  const getSalesReportExport = () => {
    setIsLoadingExport(true);
    getDailySalesExportApi(onGetSuccessSalesExport, onGetFailedSalesExport);
  };

  const onGetSuccessSalesExport = (data) => {
    window.open(data.file_path, '_blank');
    setIsLoadingExport(false);
  };

  const onGetFailedSalesExport = () => {
    setIsLoadingExport(false);
  };

  const productListCallback = (response) => {
    let list = [];
    response &&
      response.data.data.length > 0 &&
      response.data.data.map((item) => {
        list.push({
          label: item.title,
          value: item.id,
        });
      });
    setProductList(list);
  };

  const onPageChange = (currentPage) => {
    const params = {
      per_page: paginationParam.perPage,
      page: currentPage,
      product_id: filterProduct,
      date_range: filterDate.date,
    };
    getSalesReportList(params);
  };

  const loadSalesReport = () => {
    onPageChange(paginationParam.currentPage);
  };

  const onHandleSelect = (value) => {
    setPaginationParam({
      currentPage: 1,
      perPage: 10,
    });
    setFilterProduct(value);
  };

  const onDateChange = (e) => {
    setPaginationParam({
      currentPage: 1,
      perPage: 10,
    });
    if (e) {
      const startDate = moment(e[0]).format();
      const endDate = moment(e[1]).format();
      const date = `${startDate.slice(0, 10)} | ${endDate.slice(0, 10)}`;
      setFilterDate({
        date,
        startDate: startDate.slice(0, 10),
        endDate: endDate.slice(0, 10),
      });
    } else {
      setFilterDate({
        date: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  const columns = [
    {
      title: t('common.table.date', 'Date'),
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: t('common.table.productName', 'Product Name'),
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => <span>{record.product && record.product.title}</span>,
    },
    {
      title: t('common.table.sku', 'SKU'),
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => <span>{record.product && record.product.sku}</span>,
    },
    {
      title: 'Number of Orders',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Sales Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <span>{asPrice(text)}</span>,
    },
  ];

  useEffect(() => {
    const params = {
      per_page: 100,
      page: 1,
    };
    const paramsUrl = new URLSearchParams(params).toString();
    getProductApi(`/list?${paramsUrl}`, productListCallback, () => {});
  }, []);

  useEffect(() => {
    loadSalesReport();
  }, [filterProduct, filterDate.date]);

  return (
    <div className="sales-report">
      <TablePanel
        data={salesReportTableData}
        title={t('pages.reports.dailySales', 'Daily Sales')}
        toolbar={
          <div className="toolbar-container">
            <div className="toolbar-sub-container">
              <Select
                className={styles.selectBox}
                size="medium"
                onChange={onHandleSelect}
                value={filterProduct}
                options={
                  new Set([
                    {
                      label: 'All Products',
                      value: '',
                    },
                    ...productsList,
                  ])
                }
              />
            </div>
            <div className="right-panel">
              <div className="toolbar-sub-container">
                <StartEndDatePicker
                  onChange={onDateChange}
                  startDate={filterDate.startDate}
                  endDate={filterDate.endDate}
                />
              </div>
              <div className="toolbar-sub-container">
                <OutlineBtn
                  className="btn-34"
                  loading={isLoadingExport}
                  onClick={getSalesReportExport}                
                >
                  {t('pages.reports.export', 'Export')}
                </OutlineBtn>
              </div>
            </div>
          </div>
        }
        columns={columns}
        applyPadding
        onPageChange={onPageChange}
        paginationParam={paginationParam}
        loading={isLoadingTable}
      />
    </div>
  );
};

export default SalesReportTable;
