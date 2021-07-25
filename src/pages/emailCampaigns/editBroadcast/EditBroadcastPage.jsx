import React, { useEffect, useState } from 'react';
import { PageContainer, Row, Col, Popconfirm, notification, Button, FileInput } from '@/components';
import PrimaryForm from '../createBroadcast/PrimaryForm';
import RawTextForm from '../createBroadcast/RawTextForm';
import { t } from '@/utils/label';
import styles from '../createBroadcast/CreateBroadcastPage.less';

import {
  getBroadcastEmailDetailApi,
  updateBroadcastEmailApi,
  updateSendBroadcastEmailApi,
} from '@/services/emailCampaigns/broadcastEmails';

const EditBroadcastEmailPage = (props) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const emailId = props.match.params.id;
  const [deletedContent, setDeletedContent] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    subject: '',
    receiver_type: 1, // 1:Users, 2:Enrollers
    user_groups: '', // comma separated user/type list
    user_countries: '', // country 2 code, comma separated

    user_ids: '', // comma separated
    is_send_enroller_tree: false,
    logo: '',
    template_id: 1,
    raw_content: '',
  });

  const [imagePhoto, setImagePhoto] = useState();
  const [imagePreview, setImagePreview] = useState(
    'https://mlm-protec-company-binary.s3-us-west-2.amazonaws.com/website_editor/email/0-common_assets/mainlogo.svg',
  );

  const onGetBroadcastEmailDetail = (res) => {
    const formData0 = {
      from_name: res.data.from_name,
      subject: res.data.subject,
      receiver_type: res.data.receiver_type,
      user_groups: res.data.user_groups,
      user_countries: res.data.user_countries,
      user_ids: res.data.user_ids,
      is_send_enroller_tree: res.data.is_send_enroller_tree === 1,
      logo: res.data.logo,
      template_id: res.data.template_id,
      raw_content: res.data.content,
    };
    setFormData(formData0);
  };

  useEffect(() => {
    setImagePreview(formData.logo);
  }, [formData.logo]);

  const onFailGetBroadcastEmailDetail = () => {};

  const getBroadcastEmailDetail = () => {
    getBroadcastEmailDetailApi(emailId, onGetBroadcastEmailDetail, onFailGetBroadcastEmailDetail);
  };

  useEffect(() => {
    if (emailId > 0) getBroadcastEmailDetail();
  }, [emailId]);
  
  const [isSending, setIsSeinding] = useState(false);
  const [isSaving, setIsSaving] = useState(false)

  const onFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  function validateForm() {
    let flag = false;
    let errorMessagesinValidation = [];
    if (!formData.from_name) {
      errorMessagesinValidation.push({ type: 'from_name', message: 'From Name should be input.' });
      flag = true;
    } else {
      setErrorMessages(errorMessagesinValidation.filter((el) => el.type !== 'title').slice());
    }
    if (!formData.subject) {
      errorMessagesinValidation.push({ type: 'subject', message: 'Subject should be input.' });
      flag = true;
    } else {
      setErrorMessages(errorMessagesinValidation.filter((el) => el.type !== 'subject').slice());
    }
    if (!formData.raw_content) {
      errorMessagesinValidation.push({ type: 'raw_content', message: 'Please input message content.' });
      flag = true;
    } else {
      setErrorMessages(errorMessagesinValidation.filter((el) => el.type !== 'raw_content').slice());
    }
    if (formData.receiver_type === 1) {
      if (formData.user_groups.length === 0) {
        errorMessagesinValidation.push({
            type: 'user_groups',
            message: 'User groups should be selected at least one.',
          });
        flag = true;
      } else {
        console.log(errorMessagesinValidation.filter((el) => el.type !== 'user_groups').slice())
      }

      if (formData.user_countries.length === 0) {
        errorMessagesinValidation.push({
            type: 'user_countries',
            message: 'User countries should be selected at least one.',
          });
        flag = true;
      } else {
        setErrorMessages(errorMessagesinValidation.filter((el) => el.type !== 'user_countries').slice());
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

  const onUpdateBroadcastEmail = () => {
    notification.success({
      message: 'Success',
      description: 'The record has been updated successfully.',
    });

    setIsSaving(false);
  };

  const onFailBroadcastEmail = () => {
    setIsSaving(false);
  };

  const onUpdateBroadcast = () => {
    if (validateForm()) {
      return;
    }
    setIsSaving(true);
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
    updateBroadcastEmailApi(emailId, requestData, onUpdateBroadcastEmail, onFailBroadcastEmail);
  };

  const onUpdateSendBroadcastEmail = (res) => {
    notification.success({
      message: 'Success',
      description: 'The broadcast email has been updated and sent successfully.',
    });
    setIsSeinding(false);
  };

  const onFailUpdateSendBroadcastEmail = () => {
    setIsSeinding(false);
  };

  const onSendBroadcast = () => {
    if (validateForm()) {
      return;
    }

    setIsSeinding(true);
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

    updateSendBroadcastEmailApi(
      emailId,
      requestData,
      onUpdateSendBroadcastEmail,
      onFailUpdateSendBroadcastEmail,
    );
  };

  const handleFileChange = (file) => {
    if (file) {
      setImagePhoto(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <PageContainer>
      <Row gutter={[15, 15]} className="create-broadcast-email-page">
        <Col span={24}>
          <PrimaryForm
            title="Edit Broadcast"
            formData={formData}
            onFormData={onFormData}
            initialized={initialized}
            setInitialized={setInitialized}
            setDeletedContent={setDeletedContent}
            errorMessages={errorMessages}
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
            content={formData.raw_content}
            deletedContent={deletedContent}
            onFormData={onFormData}
            errorMessages={errorMessages}
          />
          <div className="text-container mt-10">
            <div></div>
            <div className="actions">
              <Popconfirm
                title="Are you sure?"
                okText="Yes"
                cancelText="No"
                onConfirm={onUpdateBroadcast}
              >
                <Button
                  type="success"
                  style={{ marginRight: 10, width: 115 }}
                  loading={isSaving}
                >
                  {t("pages.emailCampaigns.save", "Save")}
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Are you sure?"
                okText="Yes"
                cancelText="No"
                onConfirm={onSendBroadcast}
              >
                <Button type="primary" loading={isSending} style={{ width: 115 }}>
                  {t("pages.emailCampaigns.send", "Send")}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default EditBroadcastEmailPage;
