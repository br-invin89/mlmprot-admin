/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { FormItem, OutlineBtn, Row, Col, Input, Select, CheckboxGroup, Option } from '@/components'
import MultiImagesUploader from './MultiImagesUploader';
import ThumbnailUploader from '../videos/ThumbnailUploader';
import styles from './ResourcesPage.less';
import { varOptions, varLabel, varKey, varValue } from '@/common/var'
import { t } from '@/utils/label';

const resourceTypeOptions = varOptions('resource.type')
const userTypeOptions = varOptions('user.type')

const ResourceModalContent = ({ data, onSave, saveBtnText }) => {
  const [formData, setFormData] = useState({
    title: '',
    eligible_user_types: '',
    type: '',
    thumbnail: null,
    file: null,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [eligibleUserTypes, setEligibleUserTypes] = useState([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(1);

  const deleteThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreviews([]);
    setFormData({ ...formData,
      thumbnail: null,
    })
  }
  const onSelectImageFile = (files) => {
    setFormData({
      ...formData,
    });
    setThumbnail(files[0]);
    const updatedFiles = files.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
    );
    setThumbnailPreviews(updatedFiles);
  };

  const onSelectFile = (files) => {
    setFormData({
      ...formData,
    });
    setFile(files[0]);
    const updatedFiles = files.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
    );
    setFilePreviews(updatedFiles);
  };

  const removeFile = () => {
    setFilePreviews([]);
    setFile(null);
    setFormData({ ...formData,
      file: null,
    })
  };

  const validateForm = () => {
    const errorMessage0 = [];
    let isValid = true;
    if (!formData.title) {
      errorMessage0.push({
        name: 'title',
        message: 'Please Enter Title',
      });
      isValid = false;
    }
    if (!formData.type === '' && !fileType) {
      errorMessage0.push({
        name: 'type',
        message: 'Please select category',
      });
      isValid = false;
    }
    if (!formData.eligible_user_types) {
      errorMessage0.push({
        name: 'eligible_user_types',
        message: 'Please select user types',
      })
      isValid = false;
    }
    if (!formData.thumbnail && !thumbnail) {
      errorMessage0.push({
        name: 'thumbnail',
        message: 'Please Upload Thumbnail'
      })
      isValid = false;
    }
    if (!formData.file && !file) {
      errorMessage0.push({
        name: 'file',
        message: 'Please Upload Resources'
      })
      isValid = false;
    }
    setErrorMessages(errorMessage0);
    return isValid;
  }

  const onSaveSuccess = () => {
    setIsUpdating(false);
    setFormData({
      title: '',
      eligible_user_types: '',
      type: 1,
      thumbnail: null,
      file: null,
    });
    setThumbnailPreviews([]);
    setFilePreviews([]);
    setFile(null);
    setThumbnail(null);
    setEligibleUserTypes([]);
  };

  const onSaveError = () => {
    setIsUpdating(false);
  };

  const onFinish = () => {    
    if (!validateForm()) {
      return;
    }
    setIsUpdating(true);
    setErrorMessages([]);

    const requestData = new FormData();
    Object.keys(formData).map((key) => {
      if (key !== 'thumbnail') requestData.append(key, formData[key]);
      if (key !== 'type') requestData.append(key, formData[key]);
    });
    if (thumbnail) requestData.append('thumbnail', thumbnail);
    if (file) requestData.append('file', file);
    onSave(requestData, onSaveSuccess, onSaveError);
  };

  const onChangeFileType = (value) => {
    setFileType(value);
    setFormData({
      ...formData,
      type: value
    })
  }

  useEffect(() => {
    if (data) {
      const formData0 = { ...data };
      if (data.thumbnail) {
        setThumbnailPreviews([{ preview: data.thumbnail }]);
      }
      if (data.file) {
        setFilePreviews([{ preview: data.file }]);
      }
      if (data.eligible_user_types) {
        const eligibleUserTypes0 = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const type of data.eligible_user_types) {
          eligibleUserTypes0.push(type * 1);
        }

        setEligibleUserTypes(eligibleUserTypes0);
      }
      setFileType(data.type);
      setFormData(formData0);
    }
  }, [data, open]);

  return (
    <div className={styles.modalContainer}>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label = {
                t('pages.resource.resourceTitle', 'Resource Title')
              }
              errorMessages={errorMessages.filter((el) => el.name === 'title')}
            >
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'title')).length > 0 ? 'has-error' : ''}></Input>
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={
                t('pages.files.category', 'Type')
              }
              errorMessages={errorMessages.filter((el) => el.name === 'type')}>
                <Select 
                  defaultValue={fileType}
                  onChange={onChangeFileType}
                >
                {resourceTypeOptions.map((resourceType) => {
                  return (
                    <Option key={resourceType.value} value={resourceType.value}>
                      {resourceType.label}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem
            className="mt-0 mb-10"
            label={
              t('common.label.userType', 'User Type')}
            errorMessages={errorMessages.filter((el) => el.name === 'eligible_user_types')}
          >
            <CheckboxGroup
              className="mb-12"
              options={userTypeOptions}
              value={eligibleUserTypes}
              onChange={(values) => {
                setFormData({ ...formData, eligible_user_types: values.join(',') });
                setEligibleUserTypes(values);
              }}
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
                label={
                  t('common.label.uploadResource', 'Upload Resource')}
                errorMessages={errorMessages.filter((el) => el.name === 'file')}
              >
              <MultiImagesUploader
                className='upload-container-resources'
                files={filePreviews}
                onChangeFile={onSelectFile}
                onDeleteFile={removeFile}
                uploadImageText={
                  t('common.label.chooseYourFile', 'Choose Your File',)}
                dropZoneProps={{
                  multiple: false,
                  accept: `.${varKey('resource.type', fileType)}` || ".pdf"
                }}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className="mt-0 mb-10"
              label={
                t('common.label.chooseYourThumbnailImage', 'Choose Your Thumbnail Image')}
              errorMessages={errorMessages.filter((el) => el.name === 'thumbnail')}
            >
              <ThumbnailUploader
                className="upload-container-product"
                files={thumbnailPreviews}
                onChangeFile={onSelectImageFile}
                onDeleteFile={deleteThumbnail}
                width="100%"
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row type="flex">
        <Col className="mc mb-0">
          <OutlineBtn
            className="mt-15"
            loading={isUpdating}
            disabled={isUpdating}
            onClick={onFinish}
          >
            {saveBtnText}
          </OutlineBtn>
        </Col>
      </Row>
    </div>
  )
};

export default ResourceModalContent;
