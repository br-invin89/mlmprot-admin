import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Option,
  Popconfirm,
  Row,
  Select,
  notification,
} from '@/components';
import styles from './VideosPage.less';
import {
  updateVideosTypeApi,
  deleteVideosTypeApi,
  createVideosTypeApi,
} from '@/services/tools/videos';
import { t } from '@/utils/label';

const CategoriesModalContent = ({
  videoTypeList = [],
  loadVideosType,
  loadTable,
  getVideosList,
  setSearchCategory,
}) => {
  const [createRecordForm] = Form.useForm();
  const [updateRecordForm] = Form.useForm();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingRecords, setUpdatingRecords] = useState(false);
  const [creatingRecords, setCreatingRecords] = useState(false);
  const [deletingRecords, setDeletingRecords] = useState(false);

  const layout = {
    wrapperCol: {
      span: 32,
    },
  };

  const onUpdateRecordSuccess = () => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t(
        'common.alert.videoCategoryHasUpdatedSuccessfully',
        'Video Category has been updated successfully',
      ),
    });
    setSelectedCategory(null);
    updateRecordForm.resetFields();
    if (loadVideosType) {
      loadVideosType();
    }
    if (loadTable) {
      loadTable();
    }
    setUpdatingRecords(false);
  };

  const onUpdateRecordFail = () => {
    console.log('Error in updating video category');
    setUpdatingRecords(false);
  };

  const onUpdateRecord = (data) => {
    setUpdatingRecords(true);
    updateVideosTypeApi(selectedCategory.id, data, onUpdateRecordSuccess, onUpdateRecordFail);
  };

  const onCreateRecordSuccess = () => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t(
        'common.alert.recordAddedSuccessfully',
        'New video category added successfully',
      ),
    });
    setSelectedCategory(null);
    createRecordForm.resetFields();
    if (loadVideosType) {
      loadVideosType();
    }
    setCreatingRecords(false);
  };

  const onCreateRecordFail = () => {
    console.log('Error in creating video category');
    setCreatingRecords(false);
  };
  const onCreateRecord = (data) => {
    try {
      setCreatingRecords(true);
      createVideosTypeApi(data, onCreateRecordSuccess, onCreateRecordFail);
    } catch (e) {
      console.log('Error while creating video category');
      setCreatingRecords(false);
    }
  };

  const onDeleteRecordSuccess = () => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: t(
        'common.alert.videoCategoryHasDeletedSuccessfully',
        'Video Category has been deleted successfully',
      ),
    });
    setSelectedCategory(null);
    setSearchCategory('');
    updateRecordForm.resetFields();
    if (loadVideosType) {
      loadVideosType();
    }
    if (loadTable) {
      const params = {
        'filter[video_type_id]': '',
        page: 1,
      };
      getVideosList(params, true);
    }
    setDeletingRecords(false);
  };

  const onDeleteRecordFail = () => {
    console.log('Error in delete video category');
    setDeletingRecords(false);
  };

  const onDeleteRecord = () => {
    try {
      setDeletingRecords(true);
      deleteVideosTypeApi(selectedCategory.id, onDeleteRecordSuccess, onDeleteRecordFail);
    } catch (e) {
      console.log('Error while deleting video category');
      setDeletingRecords(false);
    }
  };

  const onCategoryChange = (value, { children }) => {
    setSelectedCategory({
      id: value,
      name: children,
    });
    updateRecordForm.setFieldsValue({
      name: children,
    });
  };

  return (
    <>
      <Row className="mb-12">
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>
              {' '}
              {t('pages.videos.categoriesToEdit', 'Categories to Edit')}
            </div>
            <Select
              placeholder={t('pages.videos.selectCategory', 'Select Category')}
              onChange={onCategoryChange}
              value={selectedCategory ? selectedCategory.id : null}
            >
              {videoTypeList.map((videoType) => {
                return (
                  <Option key={videoType.id} value={videoType.id}>
                    {videoType.name}
                  </Option>
                );
              })}
            </Select>
          </div>
        </Col>
      </Row>
      {selectedCategory ? (
        <Form
          {...layout}
          name="basic"
          layout="vertical"
          onFinish={onUpdateRecord}
          form={updateRecordForm}
          className="mb-12"
          initialValues={{
            name: selectedCategory ? selectedCategory.name : null,
          }}
        >
          <Row>
            <Col span={24}>
              <div className={`${styles.inputContainer} mb-12`}>
                <Form.Item
                  className="mb-12"
                  label={t('common.label.name', 'Name')}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t('common.validation.pleaseEnterName', 'Please Enter Name'),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <Button
                htmlType="submit"
                type="primary"
                block
                loading={updatingRecords}
                disabled={updatingRecords}
              >
                {t('common.label.update', 'Update')}
              </Button>
            </Col>
            <Col span={12}>
              <Popconfirm
                title={t('common.label.areYouSure', 'Are you sure?')}
                okText={t('common.label.yes', 'Yes')}
                cancelText={t('common.label.no', 'No')}
                onConfirm={onDeleteRecord}
              >
                <Button danger block loading={deletingRecords} disabled={deletingRecords}>
                  {t('common.label.delete', 'Delete')}
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </Form>
      ) : null}
      <Form
        {...layout}
        name="basic"
        layout="vertical"
        onFinish={onCreateRecord}
        form={createRecordForm}
      >
        <Row>
          <Col span={24} className="mb-7">
            <div>{t('pages.videos.orCreate', 'or Create New Category')}</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className={`${styles.inputContainer} mb-12`}>
              <Form.Item
                label={t('common.label.name', 'Name')}
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('common.validation.pleaseEnterName', 'Please Enter Name'),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button
              htmlType="submit"
              type="primary"
              block
              loading={creatingRecords}
              disabled={creatingRecords}
            >
              {t('pages.videos.create', 'Create')}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CategoriesModalContent;
