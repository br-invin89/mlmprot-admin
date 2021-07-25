/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { OutlineBtn, Col, Row, UserStatusBadge, TablePanel, Space, Popconfirm } from '@/components';
import { asPrice } from '@/utils/text';
import {
  getProductApi,
  // deleteProductApi,
  changeStatusProductApi,
  restoreProductApi,
} from '@/services/products/product';
import { Link } from 'react-router-dom';
import styles from './ProductsPage.less';
import DummyImage from '@/assets/images/download.png';
import { varLabel, varValue } from '@/common/var';

const ProductListTable = ({ searchData }) => {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, record) => (
        <div className={styles.avatarContainer}>
          <div className={styles.avatarImage}>
            <img src={record.image || DummyImage} className={`${styles.productImage}`} />
          </div>
          {record.title} {record.subtitle && `(${record.subtitle})`}
        </div>
      ),
    },
    // {
    //   title: 'SKU',
    //   dataIndex: 'sku',
    //   key: 'sku',
    // },
    // {
    //   title: 'Path',
    //   dataIndex: 'path',
    //   key: 'path',
    // },
    {
      title: 'Member Price',
      dataIndex: 'member_price',
      key: 'member_price',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: 'PV',
      dataIndex: 'pv',
      key: 'pv',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'CV',
      dataIndex: 'cv',
      key: 'cv',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    // {
    //   title: 'Cost',
    //   dataIndex: 'cost_of_goods',
    //   key: 'cost_of_goods',
    //   render: (text) => {
    //     return <span>{asPrice(text)}</span>;
    //   },
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return (
          <UserStatusBadge
            status={view.value === 'deleted' ? 'deleted' : varLabel('product.status', text)}
          />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size={10}>
          {view.value === 'deleted' ? (
            <>
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => handleRestore(record.id)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn loading={isLoadingDelete && record.id === productId} danger>
                  Resotre
                </OutlineBtn>
              </Popconfirm>
            </>
          ) : (
            <>
              {record.status === 1 ? (
                <Popconfirm
                  title={'Are you sure ?'}
                  onConfirm={() => changeActiveState(record.id, record.status)}
                  okText="Yes"
                  placement="top"
                  cancelText="No"
                >
                  <OutlineBtn
                    style={{ minWidth: 100 }}
                    loading={isLoadingStatus && record.id === productId}
                    danger
                  >
                    Deactivate
                  </OutlineBtn>
                </Popconfirm>
              ) : (
                <Popconfirm
                  title={'Are you sure ?'}
                  onConfirm={() => changeActiveState(record.id, record.status)}
                  okText="Yes"
                  placement="top"
                  cancelText="No"
                >
                  <OutlineBtn
                    style={{ minWidth: 100 }}
                    loading={isLoadingStatus && record.id === productId}
                    success
                  >
                    Activate
                  </OutlineBtn>
                </Popconfirm>
              )}
              <Link to={`/products/edit/${record.id}`} className={`ant-btn ${styles.editLink}`}>
                Edit
              </Link>
              {/*
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn loading={isLoadingDelete && (record.id === productId)} danger>Delete</OutlineBtn>
              </Popconfirm>
              */}
            </>
          )}
        </Space>
      ),
    },
  ];
  // We can store this object in DB if we want config it like cms
  const headerTab = [
    { value: 'all', label: 'All Products', params: { status: '' } },
    { value: 'active', label: 'Active', params: { status: 1 } },
    { value: 'inactive', label: 'Inactive', params: { status: 2 } },
    {
      value: 'main',
      label: 'Main Products',
      params: { status: 1, is_sample: 2, is_pc: 2, is_tc: 2 },
    },
    { value: 'sample', label: 'Sample Products', params: { is_sample: 1 } },
    { value: 'credits', label: 'Product Credits', params: { is_pc: 1 } },
  ];
  const [productsData, setProductsData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [productId, setProductId] = useState(null);
  const [view, setView] = useState(headerTab[0]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const onChangeActiveState = () => {
    setIsLoadingStatus(false);
    setProductId(null);
    search(paginationParam);
  };

  const onFailChangeActiveState = () => {
    setProductId(null);
    setIsLoadingStatus(false);
  };

  const changeActiveState = (product_id, status) => {
    setIsLoadingStatus(true);
    setProductId(product_id);
    changeStatusProductApi(
      product_id,
      {
        status:
          varLabel('product.status', status) === 'Active'
            ? varValue('product.status', 'inactive')
            : varValue('product.status', 'active'),
      },
      onChangeActiveState,
      onFailChangeActiveState,
    );
  };

  const onRestoreProduct = () => {
    setProductId(null);
    setIsLoadingDelete(false);
    search();
  };

  const onFailRestoreProduct = () => {
    setProductId(null);
    setIsLoadingDelete(false);
  };

  const handleRestore = (product_id) => {
    setIsLoadingDelete(true);
    setProductId(product_id);
    restoreProductApi(product_id, onRestoreProduct, onFailRestoreProduct);
  };

  const handleLoadProduct = (resp) => {
    const { data } = resp;
    setPaginationParam({
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
    });
    setProductsData(data.data);
    setIsLoadingTable(false);
  };

  const onLoadProductFailure = () => {
    setIsLoadingTable(false);
  };

  const search = (paginationParam_) => {
    let filter = Object.keys(view.params)
      .map((key) => `${key}=${view.params[key]}`)
      .join('&');
    if (searchData) {
      const searchData0 = encodeURIComponent(searchData);
      filter = `title=${searchData0}&${filter}`;
    }
    let queryParams = '';
    if (view.value === 'deleted') {
      queryParams = `deleted=1&page=${paginationParam_.currentPage}&per_page=${paginationParam_.perPage}`;
    } else {
      queryParams = `deleted=2&page=${paginationParam_.currentPage}&per_page=${paginationParam_.perPage}`;
    }
    setIsLoadingTable(true);
    getProductApi(`?${queryParams}&&${filter}`, handleLoadProduct, onLoadProductFailure);
  };

  useEffect(() => {
    const paginationParam0 = { ...paginationParam, currentPage: 1 };
    setPaginationParam(paginationParam0);
    search(paginationParam0);
  }, [searchData, view.value]);

  function handleViewChange(value) {
    setView(value);
  }

  const onPageChange = (page) => {
    const paginationParam0 = { ...paginationParam, currentPage: page };
    search(paginationParam0);
  };

  const Header = (props) => {
    return (
      <div className="header-tab">
        <div className="tabs">
          {headerTab.map((tab) => (
            <a
              className={props.view.value === tab.value ? 'active' : ''}
              onClick={() => props.handleViewChange(tab)}
              key={tab.value}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <Row gutter={[24, 0]} className="product-table-container">
        <Col xs={24}>
          <TablePanel
            data={productsData}
            headerTabs={
              <Header
                view={view}
                handleViewChange={handleViewChange}
                className={styles.productsHeaderTab}
              />
            }
            columns={columns}
            loading={isLoadingTable}
            onPageChange={onPageChange}
            paginationParam={paginationParam}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProductListTable;
