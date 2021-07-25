/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Select } from '@/components';
import styles from '../AutoshipSubPage.less';
import { countryOptions } from '@/utils/country';

export default function TableHead(props) {
  const handleSelectCountry = (value) => {
    const searchParam = { ...props.searchParam, country: value };
    props.setSearchParam(searchParam);
    const paginationParam = { ...props.paginationParam,
      currentPage: 1,
    }
    props.loadTable(paginationParam, searchParam);
  };

  const handleSelectProduct = (value) => {
    const searchParam = { ...props.searchParam, product_id: value };
    props.setSearchParam(searchParam);
    const paginationParam = { ...props.paginationParam,
      currentPage: 1,
    }
    props.loadTable(paginationParam, searchParam);
  };

  return (
    <div className="toolbar-container">
      <div className={`toolbar-sub-container`}>
        <Select
          placeholder="All Products"
          className={styles.selectBox}
          size="medium"
          onChange={handleSelectProduct}
          options={[
            {
              label: "All Products",
              value: "",
            },
            ...props.allProductsOption ? props.allProductsOption : []
          ]}
        />
      </div>
      <div className={`toolbar-sub-container`}>
        <Select
          placeholder="All Countries"
          className={styles.selectBox}
          size="medium"
          options={[
            {
              label: "All Countries",
              value: "",
            },
            ...countryOptions()
          ]}
          onChange={handleSelectCountry}
        />
      </div>
    </div>
  );
}
