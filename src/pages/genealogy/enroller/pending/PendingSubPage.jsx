/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  PageContainer,
  Button,
  Card,
  SuccessNotification,
  AutoComplete,
  message,
  Popconfirm,
} from '@/components';
import { searchUsersByIdApi } from '@/services/common';
import { getEnrollerGenealogyApi, updateEnrollerGenealogyApi } from '@/services/genealogy/enroller';
import styles from '../GenealogyPage.less';
import TableView from './TableView';

const { Option } = AutoComplete;

export default function PendingSubPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [userOptions, setUserOptions] = useState([]);
  const [userDetails, setUserDetails] = useState(undefined);
  const [userUUID, setUserUUID] = useState('');

  const [enrollerOptions, setEnrollerOptions] = useState([]);
  const [enrollerDetails, setEnrollerDetails] = useState(undefined);
  const [enrollerUUID, setEnrollerUUID] = useState('');

  const [form, setForm] = useState({
    user_id: '',
    enroller_id: '',
  });

  const onGetGealogy = (data) => {
    const tableData0 = data.map((el) => ({
      user_id: el.user_id,
      user_uuid: el.user.uuid,
      name: `${el.user.first_name} ${el.user.last_name}`,
      username: el.user.username,
      enroller_id: el.enroller_id,
      enroller_uuid: el.enroller.uuid,
      enroller_name: `${el.enroller.first_name} ${el.enroller.last_name}`,
      admin_name: `${el.admin_name}`,
      created_at: `${el.created_at}`,
    }));
    setTableData(tableData0);
  };

  const onFailGetGenealogy = () => {};

  const loadGenealogyPenging = () => {
    getEnrollerGenealogyApi(onGetGealogy, onFailGetGenealogy);
  };

  const updateGenealogy = () => {
    // if (tableData.length > 0) {
    setIsLoading(true);
    const query = [];

    tableData.forEach((el) => {
      query.push({
        user_id: el.user_id,
        enroller_id: el.enroller_id,
      });
    });

    const queryParam = {
      batches: query,
    };
    updateEnrollerGenealogyApi(queryParam, onUpdateGenealogy, onFailUpdateGenealogy);
    // } else {
    // message.error('Please add data in batch list');
    // }
  };

  const onUpdateGenealogy = (data) => {
    setIsLoading(false);
    SuccessNotification('Successfully Updated');
  };

  const onFailUpdateGenealogy = () => {
    setIsLoading(false);
  };

  const onHandleUserChange = (value) => {
    setUserUUID(value);
    if (value) {
      searchUsersByIdApi(value, onGetGenealogylSearchUser, onFailGetGenealogylSearchUser);
    }
  };

  const onGetGenealogylSearchUser = (data) => {
    setUserOptions(
      data.map((d) => ({
        ...d,
        label: `${d.first_name} ${d.last_name}`,
        value: d.uuid,
      })),
    );
  };

  const onFailGetGenealogylSearchUser = () => {};

  const handleUserSelect = (value, option) => {
    const details = userOptions && userOptions.filter((el) => option.key === el.value);
    setUserDetails(details[0]);
    setForm({
      ...form,
      user_id: option.value,
    });
  };

  const onHandleEnrollerChange = (value) => {
    setEnrollerUUID(value);
    if (value) {
      searchUsersByIdApi(value, onGetGenealogylSearchEnroller, onFailGetGenealogylSearchEnroller);
    }
  };

  const onGetGenealogylSearchEnroller = (data) => {
    setEnrollerOptions(
      data.map((d) => ({
        ...d,
        label: `${d.first_name} ${d.last_name}`,
        value: d.uuid,
      })),
    );
  };

  const onFailGetGenealogylSearchEnroller = () => {};

  const handleEnrollerSelect = (value, option) => {
    const details = enrollerOptions && enrollerOptions.filter((el) => option.key === el.value);
    setEnrollerDetails(details[0]);
    setForm({
      ...form,
      enroller_id: option.value,
    });
  };

  const addToList = () => {
    if (!form.user_id && !form.enroller_id) {
      message.error('Please input user & enroller');
    } else if (!form.user_id) {
      message.error('Please input user');
    } else if (!form.enroller_id) {
      message.error('Please input enroller');
    } else {
      let isValid = true;
      tableData.forEach((el) => {
        if (el.user_uuid === userDetails.uuid && el.enroller_uuid === enrollerDetails.uuid) {
          message.error('This user id and enroller id already exists');
          isValid = false;
        }
      });
      if (isValid) {
        setTableData([
          ...tableData.map((d) => d),
          {
            user_id: userDetails.id,
            user_uuid: userDetails.uuid,
            name: `${userDetails.first_name} ${userDetails.last_name}`,
            username: userDetails.username,
            enroller_id: enrollerDetails.id,
            enroller_uuid: enrollerDetails.uuid,
            enroller_name: `${enrollerDetails.first_name} ${enrollerDetails.last_name}`,
            created_at: '',
            admin_name: '',
          },
        ]);
        setEnrollerOptions([]);
        setUserOptions([]);
        setUserDetails(undefined);
        setEnrollerDetails(undefined);
        setEnrollerUUID('');
        setUserUUID('');
        setForm({
          user_id: '',
          enroller_id: '',
        });
      }
    }
  };

  const removeBatchData = (index) => {
    setTableData([...tableData.filter((el, ind) => index !== ind)]);
  };

  useEffect(() => {
    loadGenealogyPenging();
  }, []);

  return (
    <div>
      <Row style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Card className={`${styles.card}`}>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
                <div className={`${styles.inputContainer}`}>
                  <div className={`${styles.inputLabel}`}>User UUID: </div>
                  <AutoComplete
                    onSelect={handleUserSelect}
                    onChange={onHandleUserChange}
                    style={{ width: '100%' }}
                    value={userUUID}
                  >
                    {userOptions.map((user) => (
                      <Option key={user.value} value={user.label}>
                        {user.label}
                      </Option>
                    ))}
                  </AutoComplete>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} xl={6} xxl={4}>
                <div className={`${styles.inputContainer}`}>
                  <div className={`${styles.inputLabel}`}>Enroller UUID: </div>
                  <AutoComplete
                    onSelect={handleEnrollerSelect}
                    onChange={onHandleEnrollerChange}
                    value={enrollerUUID}
                    style={{ width: '100%' }}
                  >
                    {enrollerOptions.map((user) => (
                      <Option key={user.value} value={user.label}>
                        {user.label}
                      </Option>
                    ))}
                  </AutoComplete>
                </div>
              </Col>
              <Col xs={24} sm={24} lg={8} xl={4} xxl={2} className={styles.inputBox}>
                <Button onClick={addToList} className={styles.listBtn}>
                  Add to List
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={styles.merchantsTable}>
          <TableView
            removeBatchData={removeBatchData}
            tableData={tableData}
            isLoading={isLoading}
          />
        </Col>
        <Col xs={24} style={{ marginTop: 20 }}>
          <Popconfirm onConfirm={updateGenealogy}>
            <Button>Schedule at 8:00 PM EST</Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
}
