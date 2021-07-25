/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Card,
  Input,
  Select,
  Checkbox,
  AutoComplete,
  FormItem,
  Tag,
  Row,
  Col,
  CheckboxGroup,
} from '@/components';
import { Radio } from 'antd';
import { countryOptions } from '@/utils/country';
import styles from './CreateBroadcastPage.less';
import {
  getBroadcastEmailSearchUserApi,
  getBroadcastEmailTemplatesApi,
} from '@/services/emailCampaigns/broadcastEmails';
import { searchUsersApi } from '@/services/common';
import { varValue, varKey, varOptions } from '@/common/var';
import { isArray } from 'lodash';

const userTypeOptions = varOptions('user.type');
/*
const userGroupOptions = [
  { value: '1', label: 'Affiliates' },
  { value: '2', label: 'Preferred Customers' },
  { value: '0', label: 'Retail Customers' },
  { value: '3', label: 'Pre-Enrollees' },
  { value: '4', label: 'Subscribers' },
];
*/

const PrimaryForm = (props) => {
  const [userGroupOptions, setUserGroupOptions] = useState([]);
  const [fromName, setFromName] = useState('');
  const [subject, setSubject] = useState('');
  const [receiverType, setReceiverType] = useState(1);
  const [userGroups, setUserGroups] = useState([]);
  const [userCountries, setUserCountries] = useState([]);
  const [isSendTree, setIsSendTree] = useState(false);
  const [template, setTemplate] = useState();
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedEnrollers, setSelectedEnrollers] = useState([]);

  const [enrollerInput, setEnrollerInput] = useState('');
  const [enrollerOptions, setEnrollerOptions] = useState([]);

  const [isLoadingBroadcastEmailTemplates, setIsLoadingBroadcastEmailTemplates] = useState(false);

  const onGetBroadcastEmailTemplates = (res) => {
    const templateOptions0 = res.data.map((item) => ({
      value: item.id,
      label: item.title,
    }));
    setTemplateOptions(templateOptions0);
    if (templateOptions0.length > 0) {
      setTemplate(1);
    }
    setIsLoadingBroadcastEmailTemplates(false);
  };

  const onFailBroadcastEmailTemplates = () => {
    setIsLoadingBroadcastEmailTemplates(false);
  };

  const getBroadcastEmailTemplates = () => {
    setIsLoadingBroadcastEmailTemplates(true);
    getBroadcastEmailTemplatesApi(onGetBroadcastEmailTemplates, onFailBroadcastEmailTemplates);
  };

  useEffect(() => {
    setUserGroupOptions([
      ...userTypeOptions.map((el) => ({ label: el.label, value: `${el.value}` })),
    ]);
    // setTemplate(props.formData.template);

    getBroadcastEmailTemplates();
  }, []);

  useEffect(() => {
    if (props.formData) {
      setFromName(props.formData.from_name);
      setSubject(props.formData.subject);
      const userGroups = props.formData.user_groups.split(',').map((el) => `${el}`);

      setUserGroups(props.formData.user_groups ? props.formData.user_groups.split(',') : []);
      setUserCountries(
        props.formData.user_countries ? props.formData.user_countries.split(',') : [],
      );
      setIsSendTree(
        varKey('broadcastEmail.isSendEnrollerTree', props.formData.is_send_enroller_tree),
      );
      setTemplate(props.formData.template_id);
      setReceiverType(props.formData.receiver_type);
      if (
        props.formData.user_ids &&
        props.formData.user_ids.length > 0 &&
        isArray(props.formData.user_ids)
      ) {
        setSelectedEnrollers([
          ...props.formData.user_ids.map((el) => {
            return {
              label: `${el.first_name} ${el.last_name}`,
              value: el.id,
            };
          }),
        ]);
      }
    }
  }, [props.formData]);

  const onGetBroadcastEmailSearchUser = (data) => {
    setEnrollerOptions(
      data.map((d) => ({
        label: `${d.first_name} ${d.last_name}`,
        value: d.id,
      })),
    );
  };

  const onFailGetBroadcastEmailSearchUser = () => {};

  const onSearchEnroller = (value) => {
    if (value) {
      searchUsersApi(value, onGetBroadcastEmailSearchUser, onFailGetBroadcastEmailSearchUser);
    }
  };

  useEffect(() => {
    const selectedEnrollersArray = [];
    selectedEnrollers.forEach((item, index) => {
      selectedEnrollersArray.push(item.value);
    });
    const userIds = selectedEnrollersArray.join(',');
    props.onFormData('user_ids', userIds);
  }, [selectedEnrollers]);

  const onSelectEnroller = (_, option) => {
    if (selectedEnrollers.filter((el) => el.value === option.value).length === 0) {
      setSelectedEnrollers([...selectedEnrollers, { label: option.label, value: option.value }]);
    }
    setEnrollerInput('');
  };
  const onRemoveEnroller = (enrollerId) => {
    setSelectedEnrollers(selectedEnrollers.filter((enroller) => enroller.value !== enrollerId));
  };
  const onChange = (e) => {
    setReceiverType(e.target.value);
    props.onFormData('receiver_type', e.target.value);
  };
  return (
    <Card className={`${styles.card}`}>
      <h2 className={`${styles.title}`}>{props.title}</h2>
      <Row gutter={[24, 0]}>
        <Col xs={24}>
          <div className="mt-12 mb-12">
            <div className={`${styles.inputContainer2}`}>
              <FormItem
                label={'* From Name'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'from_name')}
              >
                <Input
                  value={fromName}
                  onChange={(e) => {
                    setFromName(e.target.value);
                    props.onFormData('from_name', e.target.value);
                  }}
                  style={{ width: 205 }}
                  className={
                    props.errorMessages.filter((el) => el.type === 'from_name').length > 0
                      ? styles.fromNameError
                      : ''
                  }
                />
              </FormItem>
            </div>
          </div>
          <div className="mt-12 mb-12">
            <div className={`${styles.inputContainer2}`}>
              <FormItem
                label={'* Subject'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'subject')}
              >
                <Input
                  className="w-70"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    props.onFormData('subject', e.target.value);
                  }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  className={
                    props.errorMessages.filter((el) => el.type === 'subject').length > 0
                      ? styles.fromSubjectError
                      : ''
                  }
                />
              </FormItem>
            </div>
          </div>
          <Radio.Group onChange={onChange} value={receiverType}>
            <div className={styles.radionGroupFont}>
              <div className={`${styles.inputContainer}`}>
                <Radio value={1}>Users</Radio>
              </div>
              {receiverType * 1 === 1 && (
                <>
                  <FormItem
                    errorMessages={props.errorMessages.filter((el) => el.type === 'user_groups')}
                  >
                    <div className="d-flex flex-wrap">
                      <CheckboxGroup
                        options={userGroupOptions}
                        value={userGroups}
                        onChange={(list) => {
                          setUserGroups(list);
                          props.onFormData('user_groups', list.join(','));
                        }}
                      />
                    </div>
                  </FormItem>
                  <FormItem
                    errorMessages={props.errorMessages.filter((el) => el.type === 'user_countries')}
                  >
                    <div className="mt-10 mb-10">
                      <div className={`${styles.inputContainer}`}>
                        <div className={`${styles.inputLabel}`}>Select Countries</div>
                        <Select
                          mode="multiple"
                          value={userCountries}
                          onChange={(v) => {
                            setUserCountries(v);
                            props.onFormData('user_countries', v.join(','));
                          }}
                          options={countryOptions()}
                          className={
                            props.errorMessages.filter((el) => el.type === 'user_countries')
                              .length > 0
                              ? styles.userCountriesError
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </FormItem>
                </>
              )}
            </div>
            <div className={`${styles.radionGroupFont}`}>
              <div className={`${styles.inputContainer}`}>
                <Radio value={2}>Enrollers</Radio>
              </div>
              {receiverType * 1 === 2 && (
                <>
                  <FormItem
                    errorMessages={props.errorMessages.filter((el) => el.type === 'user_ids')}
                  >
                    <div className="d-flex flex-wrap ">
                      {selectedEnrollers.map((enroller) => (
                        <Tag key={enroller.value} color={'#0599ca'} style={{ marginBottom: 4 }}>
                          {enroller.label}
                          &nbsp;&nbsp;
                          <span
                            onClick={() => onRemoveEnroller(enroller.value)}
                            style={{ fontSize: 16, cursor: 'pointer' }}
                          >
                            &times;
                          </span>
                        </Tag>
                      ))}
                    </div>
                    <div className="d-flex flex-wrap align-items-center">
                      <AutoComplete
                        placeholder="Search by username, first name, last name"
                        className={styles.searchAutoComplete}
                        onSearch={onSearchEnroller}
                        options={enrollerOptions}
                        onSelect={onSelectEnroller}
                        value={enrollerInput}
                        onChange={setEnrollerInput}
                      />
                      <Checkbox
                        className={styles.enrollerTreeCheckbox}
                        checked={isSendTree}
                        label="Send to Enroller Tree"
                        onChange={(e) => {
                          setIsSendTree(e.target.checked);
                          props.onFormData(
                            'is_send_enroller_tree',
                            varValue('broadcastEmail.isSendEnrollerTree', e.target.checked),
                          );
                        }}
                      />
                    </div>
                  </FormItem>
                </>
              )}
            </div>
          </Radio.Group>
          {/*
          <div className="mt-12">
            <Row>
              <Col xs={24} md={8}>
                <div className={`${styles.inputContainer}`}>
                  <div className={`${styles.inputLabel}`}>Template</div>
                  <Select
                    value={template}
                    onChange={(v) => {
                      setTemplate(v);
                      props.setDeletedContent(true);
                      props.onFormData('template_id', v);
                    }}
                    options={templateOptions}
                    className="mb-10"
                  />
                </div>
              </Col>
            </Row>
          </div>
          */}
        </Col>
      </Row>
    </Card>
  );
};

export default PrimaryForm;
