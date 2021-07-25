/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { InputRange, StartEndDatePicker, SelectRange } from '@/components';
import moment from 'moment';
import { loadRankOptionsApi } from '@/services/common';

export default function TableHead(props) {
  const [rankOptions, setRankOptions] = useState([]);
  const [numberRange, setNumberRange] = useState({
    start_current_rank: '',
    end_current_rank: '',

    start_left_pv: '',
    end_left_pv: '',

    start_right_pv: '',
    end_right_pv: '',

    start_left_cv: '',
    end_left_cv: '',

    start_right_cv: '',
    end_right_cv: '',

    start_left_carry_over: '',
    end_left_carry_over: '',

    start_right_carry_over: '',
    end_right_carry_over: '',

    start_left_brand_partners: '',
    end_left_brand_partners: '',

    start_right_brand_partners: '',
    end_right_brand_partners: '',
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onGetRankOptions = (data) => {
    const rankOptions0 = data.map((item) => ({ label: item.name, value: item.id }));
    setRankOptions(rankOptions0);
  };

  const loadRankOptions = () => {
    loadRankOptionsApi(onGetRankOptions);
  };

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format()}|${moment(v[1]).format()}`;
    } else {
      setStartDate('');
      setEndDate('');
    }
    const searchParam = { ...props.searchParam, ranked_at: dateRange };
    props.setSearchParam(searchParam);
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
    <div className="toolbar-container-for-lg-filters">
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }} className="select-range">
          <SelectRange
            type="number"
            startValue={numberRange.start_current_rank}
            endValue={numberRange.end_current_rank}
            startPlaceholder="Current Rank Min"
            endPlaceholder="Current Rank Max"
            startOptions={[{ label: 'Select Rank Min', value: '' }, ...rankOptions]}
            endOptions={[{ label: 'Select Rank Max', value: '' }, ...rankOptions]}
            onStartChange={(e) =>
              onStartSelect(e, 'start_current_rank', 'end_current_rank', 'current_rank')
            }
            onEndChange={(e) =>
              onEndSelect(e, 'end_current_rank', 'start_current_rank', 'current_rank')
            }
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_left_pv}
            endValue={numberRange.end_left_pv}
            startPlaceholder="Left PV Min"
            endPlaceholder="Left PV Max"
            onStartChange={(e) => onStartChange(e, 'start_left_pv', 'end_left_pv', 'left_pv')}
            onEndChange={(e) => onEndChange(e, 'end_left_pv', 'start_left_pv', 'left_pv')}
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_right_pv}
            endValue={numberRange.end_right_pv}
            startPlaceholder="Right PV Min"
            endPlaceholder="Right PV Max"
            onStartChange={(e) => onStartChange(e, 'start_right_pv', 'end_right_pv', 'right_pv')}
            onEndChange={(e) => onEndChange(e, 'end_right_pv', 'start_right_pv', 'right_pv')}
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_left_cv}
            endValue={numberRange.end_left_cv}
            startPlaceholder="Left CV Min"
            endPlaceholder="Left CV Max"
            onStartChange={(e) => onStartChange(e, 'start_left_cv', 'end_left_cv', 'left_cv')}
            onEndChange={(e) => onEndChange(e, 'end_left_cv', 'start_left_cv', 'left_cv')}
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_right_cv}
            endValue={numberRange.end_right_cv}
            startPlaceholder="Right CV Min"
            endPlaceholder="Right CV Max"
            onStartChange={(e) => onStartChange(e, 'start_right_cv', 'end_right_cv', 'right_cv')}
            onEndChange={(e) => onEndChange(e, 'end_right_cv', 'start_right_cv', 'right_cv')}
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_left_carry_over}
            endValue={numberRange.end_left_carry_over}
            startPlaceholder="Left Carry Over Min"
            endPlaceholder="Left Carry Over Max"
            onStartChange={(e) =>
              onStartChange(e, 'start_left_carry_over', 'end_left_carry_over', 'left_carry_over')
            }
            onEndChange={(e) =>
              onEndChange(e, 'end_left_carry_over', 'start_left_carry_over', 'left_carry_over')
            }
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_right_carry_over}
            endValue={numberRange.end_right_carry_over}
            startPlaceholder="Right Carry Over Min"
            endPlaceholder="Right Carry Over Max"
            onStartChange={(e) =>
              onStartChange(e, 'start_right_carry_over', 'end_right_carry_over', 'right_carry_over')
            }
            onEndChange={(e) =>
              onEndChange(e, 'end_right_carry_over', 'start_right_carry_over', 'right_carry_over')
            }
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_left_brand_partners}
            endValue={numberRange.end_left_brand_partners}
            startPlaceholder="Left Brand Partners Min"
            endPlaceholder="Left Brand Partners Max"
            onStartChange={(e) =>
              onStartChange(
                e,
                'start_left_brand_partners',
                'end_left_brand_partners',
                'left_brand_partners',
              )
            }
            onEndChange={(e) =>
              onEndChange(
                e,
                'end_left_brand_partners',
                'start_left_brand_partners',
                'left_brand_partners',
              )
            }
          />
        </div>
      </div>
      <div className="toolbar-sub-container">
        <div style={{ width: '430px' }}>
          <InputRange
            type="number"
            startValue={numberRange.start_right_brand_partners}
            endValue={numberRange.end_right_brand_partners}
            startPlaceholder="Right Brand Partners Min"
            endPlaceholder="Right Brand Partners Max"
            onStartChange={(e) =>
              onStartChange(
                e,
                'start_right_brand_partners',
                'end_right_brand_partners',
                'right_brand_partners',
              )
            }
            onEndChange={(e) =>
              onEndChange(
                e,
                'end_right_brand_partners',
                'start_right_brand_partners',
                'right_brand_partners',
              )
            }
          />
        </div>
      </div>
      <div className={`toolbar-sub-container`}>
        <div style={{ width: '430px' }}>
          <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
}
