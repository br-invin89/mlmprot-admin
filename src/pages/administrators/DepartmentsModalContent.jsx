/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-empty */
import React, {useEffect, useState} from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  OutlineBtn,
  MultiSelect,
  Checkbox,
  DeleteBtn, 
  SuccessNotification,
  Button,
} from '@/components';
import styles from './AdministratorsPage.less';
import { t } from '@/utils/label';
import {getDepartmentsApi, deleteDepartmentsApi} from "@/services/administrators/departments";
import {getPermissionsApi, getActionPermissionsApi} from "@/services/administrators/permissions";
import {createDepartmentsApi, updateDepartmentsApi} from "@/services/administrators/departments";

const DeparmtentModalContent = ({data, onFinish, open}) => {
  const [form] = Form.useForm();
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [departmentsName, setDepartmentsName] = useState();
  const [departmentReName, setDepartmentReName] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

  const [selectedPermission, setSelectedPermission] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [selectedActionPermissionTmp, setSelectedActionPermissionTmp] = useState([]);
  const [selectedActionPermission, setSelectedActionPermission] = useState([]);
  const [actionPermissions, setActionPermissions] = useState([]);

  const [selectedPermissionNew, setSelectedPermissionNew] = useState([]);
  const [actionPermissionsNew, setActionPermissionsNew] = useState([]);
  const [selectedActionPermissionNew, setSelectedActionPermissionNew] = useState([]);

  const [validationMsg, setValidationMsg] = useState([]);

  const onGetDepartments = (tableData_) => {
    setDepartments(tableData_.data.map(item => {return {...item, value: item.id, label: item.name}}))
    setIsLoading(false);
  };

  const onFailDepartments = () => {
    setIsLoading(false);
  };

  const loadDepartments = async (params) => {
    setIsLoading(true);
    getDepartmentsApi(params, onGetDepartments, onFailDepartments)
  }

  const onGetPermissions = (tableData_) => {
    setPermissions(tableData_.data.map(item => {return {...item, value: item.id, label: item.name}}))
    setIsLoading(false);
  };

  const onFailPermissions = () => {
    setIsLoading(false);
  };

  const loadPermissions = (params) => {
    setIsLoading(true);
    getPermissionsApi(params, onGetPermissions, onFailPermissions)
  }

  useEffect(() => {
    if (!open) {
      loadDepartments(``)
      loadPermissions(``)
    }
  }, [open]);

  const handleCheckAllPermission = (flag) => {
    if(flag) {
      setSelectedPermission(permissions.map(permission => permission.value))
    } else {
      setSelectedPermission([])
      setSelectedActionPermission([])
      setSelectedActionPermissionTmp([])
    }
  }

  const handleCheckAllActionPermission = (flag) => {
    if(flag) {
      setSelectedActionPermission(actionPermissions.map(permission => permission.value))
    } else {
      setSelectedActionPermission([])
    }
  }

  const handleCheckAllPermissionNew = (flag) => {
    if(flag) {
      setSelectedPermissionNew(permissions.map(permission => permission.value))
    } else {
      setSelectedPermissionNew([])
      setActionPermissionsNew([])
      setSelectedActionPermissionNew([])
    }
  }

  const handleCheckAllActionPermissionNew = (flag) => {
    if(flag) {
      setSelectedActionPermissionNew(actionPermissionsNew.map(permission => permission.value))
    } else {
      setSelectedActionPermissionNew([])
    }
  }

  const handlePermissionsChangeNew = (value) => {
    setSelectedPermissionNew(value)
    setValidationMsg([])
  }

  const handlePermissionsChange = (value) => {
    setSelectedPermission(value)
    setValidationMsg([])
  }
  const handleActionPermissionsChange = (value) => {
    setSelectedActionPermission(value)
  }

  const handleActionPermissionsChangeNew = (value) => {
    setSelectedActionPermissionNew(value)
  }

  const onGetActionPermissions = ({data}) => {
    setActionPermissions(data.map(item => {return {...item, value: item.id, label: item.name}}))
    setSelectedActionPermission(selectedActionPermissionTmp);
    setIsLoading(false);
  }

  const onFailGetActionPermissions = () => {
    setIsLoading(false);
  }

  useEffect(() => {
    let selectedPermissions = [];
    let selectedActionPermissions = [];
    departments.map(dept => {
      if(dept.id === selectedDepartment) {
        setDepartmentsName(dept.name)
        selectedPermissions = dept.permissions.map(permission => permission.id)
        selectedActionPermissions = dept.action_permissions.map(action_permission => action_permission.id)
      }
    })
    setSelectedPermission(selectedPermissions)
    setSelectedActionPermissionTmp(selectedActionPermissions)
    
  }, [selectedDepartment]);

  useEffect(() => {
    
    if (selectedPermission.length === 0) {
      setSelectedActionPermission([]);
      setActionPermissions([]);
    } else {
      let selectedPermissionIds = '';
      selectedPermission.map(permission => {
        if (selectedPermissionIds.length > 0) selectedPermissionIds = `${selectedPermissionIds  },`;
        selectedPermissionIds += permission;
      })
      if (selectedPermissionIds === '') {
        setSelectedActionPermission([]);
      } else {
        setIsLoading(true);
        getActionPermissionsApi(`?permissions=${  selectedPermissionIds}`, onGetActionPermissions, onFailGetActionPermissions);
      }
    }
  }, [selectedPermission]);

  const handleDepartmentChange = (value, obj) => {
    // form.setFieldsValue({department_rename: obj.name});
    setDepartmentReName(obj.name);
    setSelectedDepartment(value)
  }

  const onGetActionPermissionsNew = ({data}) => {
    setActionPermissionsNew(data.map(item => {return {...item, value: item.id, label: item.name}}))
    setSelectedActionPermissionNew([]);
    setIsLoading(false);
  }

  const onFailGetActionPermissionsNew = () => {
    setIsLoading(false);
  }


  useEffect(() => {
    if (selectedPermissionNew.length === 0) {
      setSelectedActionPermissionNew([]);
      setActionPermissionsNew([]);
    } else {
      let selectedPermissionIdsNew = '';
      selectedPermissionNew.map(permission => {
        if (selectedPermissionIdsNew.length > 0) selectedPermissionIdsNew = `${selectedPermissionIdsNew  },`;
        selectedPermissionIdsNew += permission;
      })
      if (selectedPermissionIdsNew === '') {
        setSelectedActionPermissionNew([]);
      } else {
        setIsLoading(true);
        getActionPermissionsApi(`?permissions=${  selectedPermissionIdsNew}`, onGetActionPermissionsNew, onFailGetActionPermissionsNew);
      }
    }

  }, [selectedPermissionNew]);


  const resetForm = () => {
    setTimeout(() => {
      onFinish()
      setSelectedPermissionNew([])
      setSelectedPermission([])
      setSelectedActionPermissionNew([])
      setDepartments([])
      form.resetFields()
      loadDepartments(``)
      loadPermissions(``)  
    }, 300)
  }
  const onDeleteSuccess = () => {
    setDepartmentReName("");
    resetForm()
  }

  const onCreateDepartmentApiSuccess = () => {
    setIsCreateLoading(false);
    SuccessNotification(t('common.alert.recordAddedSuccessfully', 'New record added successfully'))
    resetForm()
  };

  const onCreateDepartmentApiError = () => {
    setIsCreateLoading(false);
    resetForm()
  };

  const validateForCreateDepartment = () => {
    let res = true;
    let validationMsg_ = [];
    if (!form.getFieldValue('department_name')) {
      res = false;
      validationMsg_['create_department_name'] = "Please input department name.";
    }
    if (!selectedPermissionNew || selectedPermissionNew.length == 0) {
      res = false;
      validationMsg_['create_permission'] = "Please select permissions at least one.";
    }
    setValidationMsg(validationMsg_);
    return res;
  }

  const validateForUpdateDepartment = () => {
    let res = true;
    let validationMsg_ = [];
    if (!departmentReName) {
      res = false;
      validationMsg_['update_department_name'] = "Please input department name.";
    }
    if (!selectedPermission || selectedPermission.length == 0) {
      res = false;
      validationMsg_['update_permission'] = "Please select permissions at least one.";
    }
    setValidationMsg(validationMsg_);
    return res;
  }

  const createNewDepartment = () => {
    if (validateForCreateDepartment()) {
      const postData = {
        name : form.getFieldValue('department_name'),
        permissions: selectedPermissionNew,
        action_permissions: selectedActionPermissionNew
      }
      try {
        setIsCreateLoading(true)
        createDepartmentsApi(postData, onCreateDepartmentApiSuccess,onCreateDepartmentApiError);
      } catch (e) {
        console.log('Error while creating Department');
      }
    }
  }

  const onUpdateDepartmentApiSuccess = () => {
    setIsUpdateLoading(false);
    setTimeout(() => {
      SuccessNotification(t('common.alert.recordUpdateSuccessfully', 'New record Update successfully'))
      onFinish()
      loadDepartments(``)
      loadPermissions(``)  
    }, 300)
  };

  const onUpdateDepartmentApiError = () => {
    setIsUpdateLoading(false);
  };

  const updateDepartment = () => {
    if (validateForUpdateDepartment()) {
      const postData = {
        name : departmentReName,
        permissions: selectedPermission,
        action_permissions: selectedActionPermission
      }
      try {
        setIsUpdateLoading(true)
        updateDepartmentsApi(form.getFieldValue('department_id'), postData, onUpdateDepartmentApiSuccess,onUpdateDepartmentApiError);
      } catch (e) {
        console.log('Error while Update Department');
      }
    }
  }
  const onChangeDepartMentReName = (e) => {
    setDepartmentReName(e.target.value)
    let validationmsg_ = validationMsg.slice();
    if (e.target.value) {
      validationmsg_['department_rename'] = '';
    } else {
      validationmsg_['department_rename'] = 'Please input department name';
    }
    setValidationMsg(validationmsg_);
  }
  return (
    <Form
      {...layout}
      name="basic"
      layout="vertical"
      initialValues={
        data || {}
      }
      onFinish={onFinish}
      form={form}
    >
      <Row gutter={[15, 0]}>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('common.label.departments', 'Departments')}
              name="department_id"
              rules={[{ required: true, message: t('common.validation.pleaseSelectDepartment','Please Select Department') }]}
            >
              <Select
                options={departments}
                onChange={handleDepartmentChange}
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('pages.administrators.departmentName', 'Name')}
              // name="department_rename"
            >
              <Input
                value={departmentReName}
                onChange={(e) => {onChangeDepartMentReName(e)}}
              />
              {validationMsg['update_department_name'] && <div style={{color:"red"}} >{validationMsg['update_department_name']}</div>}
            </Form.Item>
          </div>
        </Col>

        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {t("pages.administrators.permission", "Permission")}
              <span className="float-right">
                <span className="select-all-btn" onClick={() => handleCheckAllPermission(true)}>
                  {t("pages.administrators.selectAllPermission", "Select all")}
                </span>
                {' / '}
                <span className="unselect-all-btn" onClick={() => handleCheckAllPermission(false)}>
                  {t("pages.administrators.unselectAllPermission", "Unselect all")}
                </span>
              </span>
            </div>
            <MultiSelect
              value={selectedPermission}
              options={permissions}
              onChange={handlePermissionsChange}
            />
            {validationMsg['update_permission'] && <div style={{color:"red"}} >{validationMsg['update_permission']}</div>}
          </div>
        </Col>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {t("pages.administrators.actionPermission", "Action Permission")}
              <span className="float-right">
                <span className="select-all-btn" onClick={() => handleCheckAllActionPermission(true)}>
                  {t("pages.administrators.selectAllPermission", "Select all")}
                </span>
                {' / '}
                <span className="unselect-all-btn" onClick={() => handleCheckAllActionPermission(false)}>
                  {t("pages.administrators.unselectAllPermission", "Unselect all")}
                </span>
              </span>
            </div>
            <MultiSelect
              value={selectedActionPermission}
              options={actionPermissions}
              onChange={handleActionPermissionsChange}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]} justify="center">
        <Col span={6} className={`${styles.inputBtn}`}>
          <OutlineBtn onClick={updateDepartment} loading={isUpdateLoading}>
            {t("common.label.update", "Update")}
          </OutlineBtn>
        </Col>
        <Col span={6}>
          <DeleteBtn
            data={{id: selectedDepartment}}
            onDeleteSuccess={onDeleteSuccess}
            deleteApi={deleteDepartmentsApi} />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="mb-7">
          {t("pages.administrators.orCreateDepartment", "or Create New Department")}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('pages.administrators.departmentName', 'Name')}
              name="department_name"
            >
              <Input
                onChange={(e) => {setValidationMsg([]); form.setFieldsValue({department_name: e.target.value})}}
              />
              {validationMsg['create_department_name'] && <div style={{color:"red"}} >{validationMsg['create_department_name']}</div>}
            </Form.Item>            
          </div>
        </Col>
      </Row>
      <Row gutter={[15,15]}>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {t("pages.administrators.permission", "Permission")}
              <span className="float-right">
                <span className="select-all-btn" onClick={() => handleCheckAllPermissionNew(true)}>
                  {t("pages.administrators.selectAllPermission", "Select all")}
                </span>
                {' / '}
                <span className="unselect-all-btn" onClick={() => handleCheckAllPermissionNew(false)}>
                {t("pages.administrators.unselectAllPermission", "Unselect all")}
                </span>
              </span>
            </div>
            <MultiSelect
              value={selectedPermissionNew}
              options={permissions}
              onChange={handlePermissionsChangeNew}
            />
            {validationMsg['create_permission'] && <div style={{color:"red"}} >{validationMsg['create_permission']}</div>}
          </div>
        </Col>
        <Col span={12}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {t("pages.administrators.actionPermission", "Action Permission")}
              <span className="float-right">
                <span className="select-all-btn" onClick={() => handleCheckAllActionPermissionNew(true)}>
                  {t("pages.administrators.selectAllPermission", "Select all")}
                </span>
                {' / '}
                <span className="unselect-all-btn" onClick={() => handleCheckAllActionPermissionNew(false)}>
                  {t("pages.administrators.unselectAllPermission","Unselect all")}
                </span>
              </span>
            </div>
            <MultiSelect
              value={selectedActionPermissionNew}
              options={actionPermissionsNew}
              onChange={handleActionPermissionsChangeNew}
            />
          </div>
        </Col>
      </Row>
      <Row justify="center" orientation="center">
        <Col span={6}>
          <OutlineBtn onClick={createNewDepartment} block loading={isCreateLoading}>
            {t("pages.administrators.create", "Create")}
          </OutlineBtn>
        </Col>
      </Row>
    </Form>
  );
};

export default DeparmtentModalContent;
