import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';

import {
  Card, Row, Col
} from '@/components';

import styles from './EditSystemEmailPage.less';

const TagNamesCard = ({ tagNames }) => {
  return (
    <>
      <div className="system-email-tag-names-container">
        <Card className={`${styles.card}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">
                {t("pages.emailCampaigns.availableTags", "Available Tags")}
              </div>
            </Col>
          </Row>
          <Row>
            {tagNames && tagNames.map((tag, index) => (
              <Col xs={24} sm={24} key={index}>
                <div className="label">
                  {tag.name}
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </>
  );
};

export default TagNamesCard;
