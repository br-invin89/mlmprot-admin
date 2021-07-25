import React, { useEffect, useState } from 'react';
import { Card, FormItem } from '@/components';
import styles from './CreateBroadcastPage.less';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-classic';

import { getBroadcastEmailTemplateDetailApi } from '@/services/emailCampaigns/broadcastEmails';

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

const RawTextForm = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [contentInput, setContentInput] = useState('');

  const onGetBroadcastEmailTemplateDetail = (res) => {
    // setIsLoading(false);
    setContentInput(res.data);
  };

  const onFailGetBroadcastEmailTemplateDetail = () => {
    // setIsLoading(false);
  };

  const getBroadcastEmailTemplateDetail = (templateId) => {
    // setIsLoading(true);
    getBroadcastEmailTemplateDetailApi(
      templateId,
      onGetBroadcastEmailTemplateDetail,
      onFailGetBroadcastEmailTemplateDetail,
    );
  };

  useEffect(() => {
    if (props.deletedContent) {
      getBroadcastEmailTemplateDetail(props.template_id);
    }
  }, [props.template_id]);

  useEffect(() => {
    if (props.content) {
      setContentInput(props.content);
    }
  }, [props.content]);

  return (
    <Card className={`${styles.card}`}>
      <FormItem errorMessages={props.errorMessages.filter((el) => el.type === 'raw_content')}>
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={contentInput}
          onChange={(event, editor) => {
            const data = editor.getData();
            props.onFormData('raw_content', data);
            setContentInput(data);
          }}
        />
      </FormItem>
    </Card>
  );
};

export default RawTextForm;
