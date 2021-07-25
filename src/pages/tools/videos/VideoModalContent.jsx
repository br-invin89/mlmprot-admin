/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react'
import { OutlineBtn, Row, Col, Input, Select, CheckboxGroup, Option, FormItem } from '@/components'
import VideoUploader from './VideoUploader';
import ThumbnailUploader from './ThumbnailUploader';
import styles from './VideosPage.less';
import { t } from '@/utils/label';
import { varOptions } from '@/common/var';

const userTypeOptions = varOptions('user.type')

const VideoModalContent = ({ data, onSave, saveBtnText, videoTypeList = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    eligible_user_types: '',
    video_type_id: '',
    created_at: '',
    thumbnail: null,
    video: null,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [eligibleUserTypes, setEligibleUserTypes] = useState([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [video, setVideo] = useState(null);
  const [selectedVideoType, setSelectedVideoType] = useState([]);
  
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
      thumbnail: files[0]
    });
    setThumbnail(files[0]);
    const updatedFiles = files.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
    );
    setThumbnailPreviews(updatedFiles);
  };

  
  const removeFile = () => {
    setVideoPreviews([]);
    setVideo(null);
    setFormData({ ...formData,
      video: null,
    })
  };

  const onSelectVideoFile = (files) => {
    setFormData({
      ...formData,
      video: files[0]
    });
    setVideo(files[0]);
    const updatedFiles = files.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
    );
    setVideoPreviews(updatedFiles);
  };

  const validateForm = () => {
    const errorMessage0 = [];
    let isValid = true;
    if (!formData.name) {
      errorMessage0.push({
        name: 'name',
        message: 'Please Enter Title',
      });
      isValid = false;
    }
    if (!formData.video_type_id) {
      errorMessage0.push({
        name: 'video_type_id',
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
    if (!formData.video && !video) {
      errorMessage0.push({
        name: 'video',
        message: 'Please Upload Video'
      })
      isValid = false;
    }
    setErrorMessages(errorMessage0);
    return isValid;
  }

  const onSaveSuccess = () => {
    setIsUpdating(false);
    setFormData({
      name: '',
      eligible_user_types: '',
      video_type_id: '',
      created_at: '',
      thumbnail: null,
      video: null,
    });
    setSelectedVideoType([]);
    setThumbnailPreviews([]);
    setThumbnail([]);
    setVideo([]);
    setVideoPreviews([]);
    setEligibleUserTypes([]);
  };

  const onSaveError = () => {
    setIsUpdating(false);
  };

  const getVideoTypeList = () => {
    return videoTypeList.map(item=> {
      return {
        label: item.name, 
        value: item.id
      }})
  }

  const onFinish = () => {    
    if (!validateForm()) {
      return;
    }
    setIsUpdating(true);
    setErrorMessages([]);

    const requestData = new FormData();
    Object.keys(formData).map((key) => {
      if (key !== 'thumbnail') requestData.append(key, formData[key]);
      if (key !== 'video') requestData.append(key, formData[key]);
    });
    if (thumbnail) requestData.append('thumbnail', thumbnail);
    if (video) requestData.append('video', video);
    onSave(requestData, onSaveSuccess, onSaveError);
  };

  useEffect(() => {
    if (data) {
      let formData0 = { ...data };
      if (data.thumbnail) {
        setThumbnailPreviews([{ preview: data.thumbnail }]);
      }
      if (data.video) {
        setVideoPreviews([{ preview: data.video }]);
      }
      if (data.eligible_user_types) {
        const eligibleUserTypes0 = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const type of data.eligible_user_types) {
          eligibleUserTypes0.push(type * 1);
        }        
        setEligibleUserTypes(eligibleUserTypes0);
      }
      if (data.video_type) {
        setSelectedVideoType(data.video_type.id); 
        formData0 = { ...formData0,
          video_type_id: data.video_type.id,
        }  
      } else {
        setSelectedVideoType([]); 
      }
      setFormData(formData0);
    }
  }, [data]);
  
  return (
    <div className={styles.modalContainer}>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label = {
                t('pages.videos.videoTitle', 'Video Title')
              }
              errorMessages={errorMessages.filter((el) => el.name === 'name')}
            >
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={(errorMessages.filter((el) => el.name === 'name')).length > 0 ? 'has-error' : ''} />
            </FormItem>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
              label={
                t('pages.videos.category', 'Please select category')
              }
              errorMessages={errorMessages.filter((el) => el.name === 'video_type_id')}>
                <Select       
                  options={getVideoTypeList()}            
                  onChange={(value) => {
                    setFormData({ ...formData,
                      video_type_id: value
                    });
                    setSelectedVideoType(value);
                  }}                  
                  value={selectedVideoType}
                  className={(errorMessages.filter((el) => el.name === 'video_type_id')).length > 0 ? 'has-error' : ''}
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
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={`${styles.inputContainer}`}>
            <FormItem
                label={
                  t('common.label.uploadVideo', 'Upload Video')}
                errorMessages={errorMessages.filter((el) => el.name === 'video')}
              >
              <VideoUploader
                className='upload-container-videos'
                files={videoPreviews}
                onChangeFile={onSelectVideoFile}
                onDeleteFile={removeFile}
                width="100%"
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


export default VideoModalContent;
