import React, { useState, useEffect } from 'react';
import { Input, Select, Row, Col, StartEndDatePicker } from '@/components';
import { t } from '@/utils/label';
import moment from 'moment';
import styles from '../UserSearchPage.less';
import { loadRankOptionsApi } from '@/services/common';
import { varOptionsWithDefault } from '@/common/var';

export default function GeneralSubForm(props) {
  const [formData, setFormData] = useState(props.searchParam);
  const [rankOptions, setRankOptions] = useState([]);
  const [createdAtFrom, setCreatedAtFrom] = useState('');
  const [createdAtTo, setCreatedAtTo] = useState('');

  const onGetRankOptions = (data) => {
    const rankOptions0 = data.map((item) => ({ label: item.name, value: item.id }));
    setRankOptions(rankOptions0);
  };

  const loadRankOptions = () => {
    loadRankOptionsApi(onGetRankOptions);
  };

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.setSearchParam({
      ...props.searchParam,
      [field]: value,
    });
  };

  const onChangeCreatedAtRange = (dates) => {
    if (dates) {
      setCreatedAtFrom(dates[0]);
      setCreatedAtTo(dates[1]);
      props.setSearchParam({
        ...props.searchParam,
        created_at: `${moment(dates[0]).format('YYYY-MM-DD')}|${moment(dates[1]).format(
          'YYYY-MM-DD',
        )}`,
      });
    } else {
      setCreatedAtFrom('');
      setCreatedAtTo('');
      props.setSearchParam({
        ...props.searchParam,
        created_at: ``,
      });
    }
  };

  useEffect(() => {
    loadRankOptions();
  }, []);

  useEffect(() => {
    setFormData(props.searchParam);
  }, [props.searchParam]);

  return (
    <>
      <div>
        <Row>
          <Col>
            <div className={`${styles.title}`}>
              {t('pages.userSearch.userInformation', 'User Information')}
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>User UUID</div>
              <Input
                value={formData.uuid}
                onChange={(e) => onFormData('uuid', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Username</div>
              <Input
                value={formData.username}
                onChange={(e) => onFormData('username', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>First Name</div>
              <Input
                value={formData.first_name}
                onChange={(e) => onFormData('first_name', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Last Name</div>
              <Input
                value={formData.last_name}
                onChange={(e) => onFormData('last_name', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Email</div>
              <Input
                value={formData.email}
                onChange={(e) => onFormData('email', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>First Order IP</div>
              <Input
                value={formData.first_order_ip}
                onChange={(e) => onFormData('first_order_ip', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Status</div>
              <Select
                options={varOptionsWithDefault('user.status')}
                value={formData.status}
                onChange={(v) => onFormData('status', v)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>User Type</div>
              <Select
                options={varOptionsWithDefault('user.type')}
                value={formData.type}
                onChange={(v) => onFormData('type', v)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Rank</div>
              <Select
                options={[{ label: '', value: '' }, ...rankOptions]}
                value={formData.rank_id}
                onChange={(v) => onFormData('rank_id', v)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Verified</div>
              <Select
                options={varOptionsWithDefault('user.verificationStatus')}
                value={formData.verification_status}
                onChange={(v) => onFormData('verification_status', v)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Tax Status</div>
              <Select
                options={varOptionsWithDefault('user.taxStatus')}
                value={formData.tax_status}
                onChange={(v) => onFormData('tax_status', v)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Show Leaderboard?</div>
              <Select
                options={varOptionsWithDefault('user.showLeaderboard')}
                value={formData.show_leaderboard}
                onChange={(v) => onFormData('show_leaderboard', v)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Sponsor UUID</div>
              <Input
                value={formData.sponsor_uuid}
                onChange={(e) => onFormData('sponsor_uuid', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col>
          {/* <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Parent UUID</div>
              <Input
                value={formData.parent_uuid}
                onChange={(e) => onFormData('parent_uuid', e.target.value)}
                onPressEnter={props.onPressEnter}
              />
            </div>
          </Col> */}
          <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <div className={`${styles.inputContainer}`}>
              <div className={`${styles.inputLabel}`}>Created Between</div>
              <StartEndDatePicker
                value={[createdAtFrom, createdAtTo]}
                onChange={onChangeCreatedAtRange}
                width="100%"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
