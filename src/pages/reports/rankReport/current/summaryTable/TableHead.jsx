/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { InputRange, SelectRange, Input } from '@/components';
import { loadRankOptionsApi } from '@/services/common';
import styles from '../CurrentSubPage.less';

export default function TableHead(props) {
  const [rankOptions, setRankOptions] = useState([]);

  const [numberRange, setNumberRange] = useState({
    start_rank_range: '',
    end_rank_range: '',

    start_pv_range: '',
    end_pv_range: '',

    start_gv_range: '',
    end_gv_range: '',

    start_am_range: '',
    end_am_range: '',

    // start_right_cv: '',
    // end_right_cv: '',

    // start_left_carry_over: '',
    // end_left_carry_over: '',

    // start_right_carry_over: '',
    // end_right_carry_over: '',

    // start_left_brand_partners: '',
    // end_left_brand_partners: '',

    // start_right_brand_partners: '',
    // end_right_brand_partners: '',
  });
  const [filter, setFilter] = useState({
    uuid: '',
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
    const searchParam = { ...props.searchParam, [name]: value };
    props.setSearchParam(searchParam);
  };

  const onGetRankOptions = (data) => {
    const rankOptions0 = data.map((item) => ({ label: item.name, value: item.id }));
    setRankOptions(rankOptions0);
  };

  const loadRankOptions = () => {
    loadRankOptionsApi(onGetRankOptions);
  };

  const onStartChange = (e, start, end, keyName) => {
    const { value } = e.target;
    if ((value) => 0) {
      setNumberRange({
        ...numberRange,
        [start]: value,
      });
      props.setSearchParam({
        ...props.searchParam,
        [keyName]: `${value}|${numberRange[end]}`,
      });
    }
  };

  const onEndChange = (e, end, start, keyName) => {
    const { value } = e.target;
    if ((value) => 0) {
      setNumberRange({
        ...numberRange,
        [end]: value,
      });
      props.setSearchParam({
        ...props.searchParam,
        [keyName]: `${numberRange[start]}|${value}`,
      });
    }
  };

  const onStartSelect = (value, start, end, keyName) => {
    setNumberRange({
      ...numberRange,
      [start]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [keyName]: `${value}|${numberRange[end]}`,
    });
  };

  const onEndSelect = (value, end, start, keyName) => {
    setNumberRange({
      ...numberRange,
      [end]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [keyName]: `${numberRange[start]}|${value}`,
    });
  };

  useEffect(() => {
    loadRankOptions();
  }, []);

  return (
    <div className="toolbar-container-for-lg-filters rank-report-toolbar-container-for-lg-filters">
      <div className="toolbar-sub-container">
        <div style={{ width: '150px' }} className="select-range">
          <Input
            placeholder={'User ID'}
            size="medium"
            onChange={onHandleChange}
            name="uuid"
            value={filter.uuid}
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }} className="select-range">
          <SelectRange
            type="number"
            startValue={numberRange.start_rank_range}
            endValue={numberRange.end_rank_range}
            startPlaceholder="Rank Min"
            endPlaceholder="Rank Max"
            startOptions={[{ label: 'Select Current Rank Min', value: '' }, ...rankOptions]}
            endOptions={[{ label: 'Select Current Rank Max', value: '' }, ...rankOptions]}
            onStartChange={(e) =>
              onStartSelect(e, 'start_rank_range', 'end_rank_range', 'rank_range')
            }
            onEndChange={(e) => onEndSelect(e, 'end_rank_range', 'start_rank_range', 'rank_range')}
          />
        </div>
      </div>
    </div>
  );
}
