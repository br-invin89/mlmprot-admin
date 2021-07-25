import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { t } from '@/utils/label';
import {
  Row, Col,
  Select, StartEndDatePicker, OutlineBtn,
  notification, Popconfirm, message,
} from '@/components';
import styles from './UserActionSubPage.less';
import { changeUserRankApi, resetUserRankApi } from '@/services/userSearch/action';
import { loadRankOptionsApi } from '@/services/common';

export default function ChangeRankForm(props) {
  const [rankId, setRankId] = useState(1);
  const [advRankStart, setAdvRankStart] = useState('');
  const [advRankUntil, setAdvRankUntil] = useState('');
  const [rankOptions, setRankOptions] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReseting, setIsReseting] = useState(false);

  const onDoneUpdate = () => {
    notification.success({
      message: 'Success',
      description: 'Rank updated',
    });
    setIsUpdating(false);
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleUpdate = () => {
    if (!advRankStart || !advRankUntil) {
      message.error('Please input fixed rank from/to date range');
      return;
    }
    setIsUpdating(true);
    const data = {
      adv_rank_id: rankId,
      adv_rank_start: moment(advRankStart).format('YYYY-MM-DD'),
      adv_rank_until: moment(advRankUntil).format('YYYY-MM-DD'),
    };
    changeUserRankApi(props.userData.id, data, onDoneUpdate, onFailUpdate);
  };

  const onGetRanks = (data) => {
    setRankOptions(data.map((el) => ({ value: el.id, label: el.name })));
  };

  const onChangeDateRange = (v) => {
    if (v) {
      setAdvRankStart(v[0]);
      setAdvRankUntil(v[1]);
    } else {
      setAdvRankStart('');
      setAdvRankUntil('');
    }
  };

  const onDoneReset = () => {
    notification.success({
      message: 'Success',
      description: 'Rank reset',
    });
    setIsReseting(false);
    props.getUserDetail();
  };
  const onFailReset = () => {
    setIsReseting(false);
  };
  const handleReset = () => {
    setIsReseting(true);
    const data = {
      rank_id: rankId,
      adv_rank_start: moment(advRankStart).format('YYYY-MM-DD'),
      adv_rank_until: moment(advRankUntil).format('YYYY-MM-DD'),
    };
    resetUserRankApi(props.userData.id, data, onDoneReset, onFailReset);
  };

  useEffect(() => {
    if (props.userData) {
      setRankId(props.userData.rank_id);
      setAdvRankStart(
        props.userData.adv_rank_start ? moment(props.userData.adv_rank_start) : '',
      );
      setAdvRankUntil(
        props.userData.adv_rank_until ? moment(props.userData.adv_rank_until) : '',
      );
    }
  }, [props.userData]);

  useEffect(() => {
    loadRankOptionsApi(onGetRanks);
  }, []);

  return (
    <div className={`${styles.payoutContainer} ${styles.changeRankContainer}`}>
      <Row gutter={[24, 0]}>
        <Col>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Change Rank</div>
            <Select
              className={`${styles.statusInput}`}
              value={rankId}
              onChange={(v) => setRankId(v)}
              options={rankOptions}
            />
          </div>
        </Col>
        <Col>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Start/Until Date</div>
            <StartEndDatePicker
              className={`${styles.datePicker}`}
              startDate={advRankStart}
              endDate={advRankUntil}
              onChange={onChangeDateRange}
            />
          </div>
        </Col>
        <Col>
          <div className={`${styles.statusBtn}`}>
            <Popconfirm onConfirm={handleUpdate}>
              <OutlineBtn
                className={`${styles.button} mb-12`}
                loading={isUpdating}
                disabled={isUpdating}
              >
                {t('pages.userSearch.saveBtn', 'Save')}
              </OutlineBtn>
            </Popconfirm>
          </div>
        </Col>
        {props.userData.adv_rank_id && (
          <Col>
            <div className={`${styles.statusBtn}`}>
              <Popconfirm onConfirm={handleReset}>
                <OutlineBtn
                  className={`${styles.button} mb-12`}
                  danger
                  loading={isReseting}
                  disabled={isReseting}
                >
                  {t('pages.userSearch.resetBtn', 'Reset')}
                </OutlineBtn>
              </Popconfirm>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}
