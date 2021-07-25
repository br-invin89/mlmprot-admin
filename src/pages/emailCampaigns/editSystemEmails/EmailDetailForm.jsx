import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Card, Row, Col, Button, notification, FormItem } from '@/components';
import {
  saveSystemEmailDetailContentApi,
  restoreSystemEmailDetailContentApi,
} from '@/services/emailCampaigns/systemEmails';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'uploadImage',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

const EmailDetailForm = ({ logoImage, footerText, emailId, content }) => {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingRestore, setIsLoadingRestore] = useState(false);
  const [contentInput, setContentInput] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const onSaveSystemEmailDetail = () => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: 'The system email data has saved successfully',
    });

    setIsLoadingSave(false);
  };
  const onFailSaveSystemEmailDetail = () => {
    setIsLoadingSave(false);
  };

  const validateForm = () => {
    const errorMessage0 = [];
    let isValid = true;
    if (!contentInput) {
      errorMessage0.push({
        name: 'content',
        message: 'Please Enter Content',
      });
      isValid = false;
    }
    setErrorMessages(errorMessage0);
    return isValid;
  };

  const handleSave = () => {
    const validResult = validateForm();
    if (validResult) {
      setIsLoadingSave(true);
      saveSystemEmailDetailContentApi(
        emailId,
        contentInput,
        onSaveSystemEmailDetail,
        onFailSaveSystemEmailDetail,
      );
    }
  };

  const onRestoreSystemEmailDetail = (res) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: 'The system email data has been changed by origin content successfully',
    });
    setContentInput(res.data.content);
    setIsLoadingRestore(false);
  };

  const onFailRestoreSystemEmailDetail = () => {
    setIsLoadingRestore(false);
  };

  const handleRestore = () => {
    if (isLoadingRestore === false) {
      setIsLoadingRestore(true);
      restoreSystemEmailDetailContentApi(
        emailId,
        onRestoreSystemEmailDetail,
        onFailRestoreSystemEmailDetail,
      );
    }
  };

  useEffect(() => {
    if (content) {
      setContentInput(content);
    }
  }, [content]);

  return (
    <div className="system-email-detail-container">
      <Card>
        <Row className="center">
          <Col>
            <img src={logoImage} className="logo-image" />
          </Col>
        </Row>
        <Row className="mt-15">
          <Col className="rich-editor">
            <FormItem
              className="mt-0 mb-10"
              errorMessages={errorMessages.filter((el) => el.name === 'content')}
            >
              <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={contentInput}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContentInput(data);
                }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row className="center">
          <Col className="mt-15">
            <div className="footer-text">
              {footerText.split('\n').map((line, index) => {
                return <div key={index}>{line}</div>;
              })}
            </div>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col xl={24} className="btn-group">
          <Button
            type="primary"
            loading={isLoadingSave}
            disabled={isLoadingSave}
            onClick={handleSave}
          >
            {t('pages.emailCampaigns.save', 'Save')}
          </Button>
          <Button
            type="danger"
            loading={isLoadingRestore}
            disabled={isLoadingRestore}
            onClick={handleRestore}
          >
            {t('pages.emailCampaigns.restore', 'Restore')}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default EmailDetailForm;
