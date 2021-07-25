import React, { useState } from 'react';
import { PageContainer, Row, Col, Popconfirm, Button, FileInput, notification } from '@/components';
import PrimaryForm from './PrimaryForm';
import RawTextForm from './RawTextForm';

import {
  createBroadcastEmailApi,
  createSendBroadcastEmailApi,
} from '@/services/emailCampaigns/broadcastEmails';
import { t } from '@/utils/label';

const CreateBroadcastEmailPage = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [deletedContent, setDeletedContent] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    subject: '',
    receiver_type: 1, // 1:Users, 2:Enrollers
    user_groups: '1', // comma separated 0:retail, 1:affiliate, 2:preferred, 3:pre-enrollee, 4:subscriber
    user_countries: 'US', // country 2 code, comma separated

    user_ids: '', // comma separated
    is_send_enroller_tree: false,
    logo: '',
    template_id: '',
    raw_content: '',
  });

  const [imagePhoto, setImagePhoto] = useState();
  const [imagePreview, setImagePreview] = useState(
    'https://mlm-protec-company-binary.s3-us-west-2.amazonaws.com/website_editor/email/0-common_assets/mainlogo.svg',
  );

  const handleFileChange = (file) => {
    if (file) {
      setImagePhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState(false);

  const onFormData = (field, value) => {
    let errorMessage = null;
    if (field === 'from_name') {
      if (!value) {
        errorMessage = { type: 'from_name', message: 'From Name should be input' };
      }
    }
    if (field === 'subject') {
      if (!value) {
        errorMessage = { type: 'subject', message: 'Subject should be input' };
      }
    }

    if (errorMessage === null) {
      setErrorMessages([]);
    } else {
      setErrorMessages([errorMessage]);
    }

    setFormData({ ...formData, [field]: value });
  };

  const onCreateBroadcastEmail = () => {
    notification.success({
      message: 'Success',
      description: 'The record has been created successfully.',
    });

    setIsLoading(false);
  };

  const onFailCreateBroadcastEmail = () => {
    setIsLoading(false);
  };

  function validateForm() {
    let flag = false;
    const errorMessagesinValidation = [];
    if (!formData.from_name) {
      errorMessagesinValidation.push({ type: 'from_name', message: 'From Name should be input.' });
      flag = true;
    } else {
      setErrorMessages(errorMessages.filter((el) => el.type !== 'title').slice());
    }
    if (!formData.subject) {
      errorMessagesinValidation.push({ type: 'subject', message: 'Subject should be input.' });
      flag = true;
    } else {
      setErrorMessages(errorMessages.filter((el) => el.type !== 'subject').slice());
    }
    if (!formData.raw_content) {
      errorMessagesinValidation.push({
        type: 'raw_content',
        message: 'Please input message content.',
      });
      flag = true;
    } else {
      setErrorMessages(errorMessages.filter((el) => el.type !== 'raw_content').slice());
    }

    if (formData.receiver_type === 1) {
      if (!formData.user_groups) {
        errorMessagesinValidation.push({
          type: 'user_groups',
          message: 'User groups should be selected at least one.',
        });
        flag = true;
      } else {
        setErrorMessages(errorMessages.filter((el) => el.type !== 'user_groups').slice());
      }

      if (!formData.user_countries) {
        errorMessagesinValidation.push({
          type: 'user_countries',
          message: 'User countries should be selected at least one.',
        });
        flag = true;
      } else {
        setErrorMessages(errorMessages.filter((el) => el.type !== 'user_countries').slice());
      }
    }

    if (formData.receiver_type === 2) {
      if (!formData.user_ids) {
        errorMessagesinValidation.push({
          type: 'user_ids',
          message: 'Enrollers should be selected at least one.',
        });
        flag = true;
      } else {
        setErrorMessages(errorMessagesinValidation.filter((el) => el.type !== 'user_ids').slice());
      }
    }

    setErrorMessages(errorMessagesinValidation);

    return flag;
  }

  const onCreateBroadcast = () => {
    if (validateForm()) {
      return;
    }
    setIsLoading(true);
    const requestData = new FormData();
    if (imagePhoto) requestData.append('logo', imagePhoto);
    requestData.append('from_name', formData.from_name);
    requestData.append('subject', formData.subject);
    requestData.append('receiver_type', formData.receiver_type);
    requestData.append('user_groups', formData.user_groups);
    requestData.append('user_countries', formData.user_countries);
    requestData.append('user_ids', formData.user_ids);
    requestData.append('is_send_enroller_tree', formData.is_send_enroller_tree ? 1 : 2);
    requestData.append('template_id', formData.template_id);
    requestData.append('raw_content', formData.raw_content);
    createBroadcastEmailApi(requestData, onCreateBroadcastEmail, onFailCreateBroadcastEmail);
  };

  const onCreateSendBroadcastEmail = () => {
    notification.success({
      message: 'Success',
      description: 'The broadcast email has been created and sent successfully.',
    });
    setIsLoading(false);
    setIsLoadingSend(false);
  };

  const onFailCreateSendBroadcastEmail = () => {
    setIsLoading(false);
  };

  const onSendBroadcast = () => {
    if (validateForm()) {
      return;
    }
    setIsLoadingSend(true);
    const requestData = new FormData();
    if (imagePhoto) requestData.append('logo', imagePhoto);
    requestData.append('from_name', formData.from_name);
    requestData.append('subject', formData.subject);
    requestData.append('receiver_type', formData.receiver_type);
    requestData.append('user_groups', formData.user_groups);
    requestData.append('user_countries', formData.user_countries);
    requestData.append('user_ids', formData.user_ids);
    requestData.append('is_send_enroller_tree', formData.is_send_enroller_tree ? 1 : 2);
    requestData.append('template_id', formData.template_id);
    requestData.append('raw_content', formData.raw_content);

    createSendBroadcastEmailApi(
      requestData,
      onCreateSendBroadcastEmail,
      onFailCreateSendBroadcastEmail,
    );
  };
  
  return (
    <PageContainer>
      <Row gutter={[15, 15]} className="create-broadcast-email-page">
        <Col span={24}>
          <PrimaryForm
            title="Create Broadcast"
            formData={formData}
            onFormData={onFormData}
            errorMessages={errorMessages}
            setDeletedContent={setDeletedContent}
          />
        </Col>

        <Col span={8}></Col>
        <Col span={8} className="broadcast-logo">
          <img src={imagePreview} alt="logo" />
        </Col>
        <Col span={8} className="broadcast-logo-btn">
          <FileInput handleChange={handleFileChange}>Change Logo</FileInput>
        </Col>

        <Col span={24}>
          <RawTextForm
            template_id={formData.template_id}
            onFormData={onFormData}
            content={''}
            errorMessages={errorMessages}
            deletedContent={deletedContent}
          />
          <div className="text-container mt-10">
            <div></div>
            <div className="actions">
              <Popconfirm
                title="Are you sure?"
                okText="Yes"
                cancelText="No"
                onConfirm={onCreateBroadcast}
              >
                <Button type="success" style={{ marginRight: 10, width: 115 }} loading={isLoading}>
                  {t('pages.emailCampaigns.save', 'Save')}
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Are you sure?"
                okText="Yes"
                cancelText="No"
                onConfirm={onSendBroadcast}
              >
                <Button type="primary" loading={isLoadingSend} style={{ width: 115 }}>
                  {t('pages.emailCampaigns.send', 'Send')}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CreateBroadcastEmailPage;
