import React, { useState, useEffect } from 'react';
import {
  OutlineBtn,
  PageContainer,
  TablePanel,
  Row,
  Col,
  UserStatusBadge,
  Popover,
} from '@/components';

import styles from './EditSystemEmailPage.less';
import { getSystemEmailDetailApi, getLogoAndFooterApi } from '@/services/emailCampaigns/systemEmails';
import TagNamesCard from './TagNamesCard';
import EmailDetailForm from './EmailDetailForm';

const EditSystemEmailPage = (props) => {
  const emailId = props.match.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogoAndFooter, setIsLoadingLogoAndFooter] = useState(false);
  const [isLoadingSystemEmailDetail, setIsLoadingSystemEmailDetail] = useState(false);
  const [systemEmailData, setSystemEmailData] = useState([]);
  const [logoImage, setLogoImage] = useState('');
  const [footerText, setFooterText] = useState('');

  const onGetSystemEmailDetail = (res) => {
    setSystemEmailData(res.data);
    setIsLoadingSystemEmailDetail(false);
  };
  const onFailSystemEmailDetail = () => {
    setIsLoadingSystemEmailDetail(false);
  };

  const getSystemEmailDetail = (emailId) => {
    setIsLoadingSystemEmailDetail(true);
    getSystemEmailDetailApi(emailId, onGetSystemEmailDetail, onFailSystemEmailDetail);
  }

  const onGetLogoAndFooter = (res) => {
    setLogoImage(res.data.logo.content);
    let txt = res.data.footer.content;
    setFooterText(txt);
    setIsLoadingLogoAndFooter(false);
  }

  const onFailLogoAndFooter = () => {
    setIsLoadingLogoAndFooter(false);
  }

  const getLogoAndFooter = () => {
    setIsLoadingLogoAndFooter(true);
    getLogoAndFooterApi('', onGetLogoAndFooter, onFailLogoAndFooter);
  }

  useEffect(() => {
    getSystemEmailDetail(emailId);
    getLogoAndFooter('');
  }, [emailId]);

  return (
    <PageContainer>
      {systemEmailData && <>
        <Row gutter={[15, 15]} className="system-email-detail-container">
          <Col xl={18} className="mb-15">
            <div className="subject">
              {systemEmailData.subject}
            </div>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col xl={18}>
            <EmailDetailForm
              logoImage={logoImage}
              footerText={footerText}
              content={systemEmailData.content}
              emailId={emailId}
            />
          </Col>
          <Col xs={24} xl={6}>
            <TagNamesCard tagNames={systemEmailData.tags} />
          </Col>
        </Row>
      </>}
    </PageContainer>
  );
};

export default EditSystemEmailPage;
