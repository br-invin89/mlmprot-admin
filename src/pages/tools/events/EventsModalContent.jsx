/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  OutlineBtn,
  Row,
  Col,
  RichEditor,
  Input,
  StartEndDatePicker,
  CheckboxGroup,
  FormItem,
} from '@/components';
import styles from './EventsPage.less';
import { varOptions } from '@/common/var';
import ThumbnailUploader from '@/pages/tools/videos/ThumbnailUploader';
import { t } from '@/utils/label';

const userTypeOptions = varOptions('user.type');
const EventsModalContent = ({ data, onSave, saveBtnText, open }) => {
  const [formData, setFormData] = useState({
    title: '',
    venue: '',
    street: '',
    description: '',
    eligible_user_types: '',
    start_at: '',
    end_at: '',
    image: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eligibleUserTypes, setEligibleUserTypes] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [image, setImage] = useState(null);

  const deleteImage = () => {
    setImage(null);
    setImagePreviews([]);
    setFormData({ ...formData, image: null });
  };

  const onSelectImageFile = (files) => {
    setFormData({
      ...formData,
    });
    setImage(files[0]);
    const updatedFiles = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setImagePreviews(updatedFiles);
  };

  const onChangeDate = (v) => {
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      setFormData({
        ...formData,
        start_at: moment(v[0]).format('YYYY-MM-DD'),
        end_at: moment(v[1]).format('YYYY-MM-DD'),
      });
    } else {
      setStartDate('');
      setEndDate('');
      setFormData({
        ...formData,
        start_at: '',
        end_dat: '',
      });
    }
  };

  const onSaveSuccess = () => {
    setIsUpdating(false);
    setFormData({
      title: '',
      venue: '',
      street: '',
      description: '',
      eligible_user_types: '',
      start_at: '',
      end_at: '',
      image: '',
    });
    setImagePreviews([]);
    setImage(null);
    setStartDate('');
    setEndDate('');
    setEligibleUserTypes([]);
  };

  const onSaveError = () => {
    setIsUpdating(false);
  };

  const validateForm = () => {
    const errorMessages0 = [];
    let isValid = true;
    if (!formData.title) {
      errorMessages0.push({
        name: 'title',
        message: 'Please input title',
      });
      isValid = false;
    }
    if (!formData.venue) {
      errorMessages0.push({
        name: 'venue',
        message: 'Please input venue name',
      });
      isValid = false;
    }
    if (!formData.street) {
      errorMessages0.push({
        name: 'street',
        message: 'Please input street address',
      });
      isValid = false;
    }
    if (!formData.start_at || !formData.end_at) {
      errorMessages0.push({
        name: 'date_range',
        message: 'Please input start date & end date',
      });
      isValid = false;
    }
    if (!formData.eligible_user_types) {
      errorMessages0.push({
        name: 'eligible_user_types',
        message: 'Please select user types',
      });
      isValid = false;
    }
    if (!formData.description) {
      errorMessages0.push({
        name: 'description',
        message: 'Please input description',
      });
      isValid = false;
    }
    if (!formData.image && !image) {
      errorMessages0.push({
        name: 'image',
        message: 'Please select image',
      });
      isValid = false;
    }

    setErrorMessages(errorMessages0);
    return isValid;
  };

  const onFinish = () => {
    if (!validateForm()) {
      return;
    }
    setIsUpdating(true);
    setErrorMessages([]);

    const requestData = new FormData();
    Object.keys(formData).map((key) => {
      if (key !== 'image') requestData.append(key, formData[key]);
    });
    if (image) requestData.append('image', image);
    onSave(requestData, onSaveSuccess, onSaveError);
  };

  useEffect(() => {
    if (data) {
      const formData0 = { ...data };
      if (data.image) {
        setImagePreviews([{ preview: data.image }]);
      }
      if (data.start_at) {
        setStartDate(moment(data.start_at));
      }
      if (data.end_at) {
        setEndDate(moment(data.end_at));
      }
      if (data.eligible_user_types) {
        const eligibleUserTypes0 = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const type of data.eligible_user_types) {
          eligibleUserTypes0.push(type * 1);
        }

        setEligibleUserTypes(eligibleUserTypes0);
      }
      setFormData(formData0);
    }
  }, [data]);

  return (
    <div className={styles.modalContainer}>
      <Row>
        <Col span={24} className={styles.modalContainer}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.events.eventTitle', 'Event Title')}
              errorMessages={errorMessages.filter((el) => el.name === 'title')}
            >
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'title')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.modalContainer}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.events.venueName', 'Venue Name')}
              errorMessages={errorMessages.filter((el) => el.name === 'venue')}
            >
              <Input
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'venue')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.modalContainer}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('app.settings.basic.address', 'Street Address',)}
              errorMessages={errorMessages.filter((el) => el.name === 'street')}
            >
              <Input
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'street')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.modalContainer}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('app.settings.basic.startDateEndDate', 'Start Date ~ End Date')}
              errorMessages={errorMessages.filter((el) => el.name === 'date_range')}
            >
              <StartEndDatePicker
                style={{ width: '100%' }}
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDate}
                className={(errorMessages.filter((el) => el.name === 'date_range')).length > 0 ? 'has-error' : ''}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.modalContainer}>
          <FormItem
            className="mt-0 mb-10"
            label={t( 'common.label.userType', 'User Type')}
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
        <Col span={24} className={styles.modalContainer}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={t('pages.events.eventDescription', 'Event Description')}
              errorMessages={errorMessages.filter((el) => el.name === 'description')}
            >
              <RichEditor
                placeholder={t('pages.events.enterDescription', 'Enter Description')}
                value={formData.description}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    description: value,
                  });
                }}
              />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.modalContainer}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              className="mt-0 mb-10"
              label={t('common.label.chooseYourThumbnailImage', 'Choose Your Thumbnail Image')}
              errorMessages={errorMessages.filter((el) => el.name === 'image')}
            >
              <ThumbnailUploader
                className="upload-container-product"
                files={imagePreviews}
                onChangeFile={onSelectImageFile}
                onDeleteFile={deleteImage}
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
  );
};

export default EventsModalContent;
