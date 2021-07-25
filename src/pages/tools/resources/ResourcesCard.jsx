/* eslint-disable no-unused-vars,camelcase */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import { Card, Popconfirm, Tooltip, UserTypeBadge } from '@/components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './ResourcesPage.less';
import { EditFilled, DeleteFilled, DownloadOutlined } from '@ant-design/icons';
import { stringToArray } from '@/utils/utils';
import { varLabel } from '@/common/var';
import { t } from '@/utils/label';

const ResourcesCard = ({ record, onConfirmDeleteItem, onEditItem, editToggle }) => {

  const { title, type, thumbnail, date, id } = record;
  const [isDeletingData, setIsDeletingData] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  const onDeleteEventApiSuccess = (resp) => {
    setIsDeletingData(false);
  };

  const onDeleteEventApiError = (resp) => {
    setIsDeletingData(false);
  };

  const onDelete = (resourceId) => {
    if (onConfirmDeleteItem) {
      setIsDeletingData(true);
      onConfirmDeleteItem(resourceId, onDeleteEventApiSuccess, onDeleteEventApiError);
    }
  };

  const renderShowTo = (values) => {
    if (!values)
      return t('common.label.none', 'None');

    let showTos = [];
    for (let value of values) {
      showTos.push({
        label: varLabel('user.type', value),
        value: value * 1,
      });
    }

    if (!showTos || showTos.length <= 0)
      return t('common.label.none', 'None');

    return (
      <div className="d-flex align-items-center">
        {showTos.map(({ label, value }, index) =>
          index === showTos.length - 1 ? (
            <UserTypeBadge type={label} />
          ) : (
            <>
              <UserTypeBadge type={label} /> |{' '}
            </>
          ),
        )}
      </div>
    );
  };

  const eligible_user_types = record.eligible_user_types
    ? renderShowTo(stringToArray(record.eligible_user_types))
    : null;

  return (
    <>
      <Card className={`${styles.card}`}>
        <div
          className="card-img object-fit-cover"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            height: '218px',
            backgroundImage: `url('${thumbnail}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'left 0px',
          }}
        />
        <div className="card-bottom-view">
          <div>
            <div className="type-text">{varLabel('resource.type', type)}</div>
            <div>
              <Tooltip title={title}>
                <div className="truncate d-index-block">{title}</div>
              </Tooltip>
            </div>
            {eligible_user_types && (
              <Tooltip title={eligible_user_types}>
                {' '}
                <div className="truncate block">{eligible_user_types}</div>{' '}
              </Tooltip>
            )}
          </div>
          <div className="card-icon-view">
            <div className={styles.resourcesIcon}>
              <EditFilled
                onClick={() => {
                  onEditItem(record);
                  editToggle();
                }}
              />
              {isDeletingData ? (
                <Spin className="mr-10" indicator={antIcon} />
              ) : (
                <Popconfirm
                  title={t('common.label.areYouSure','Are you sure?')}
                  okText={t('common.label.yes', 'Yes')}
                  cancelText={t('common.label.no', 'No')}
                  onConfirm={() => {
                    onDelete(id);
                  }}
                >
                  <DeleteFilled />
                </Popconfirm>
              )}

              <a href={record.file} target="_blank">
                <DownloadOutlined />
              </a>
            </div>
            <div className="text-secondary mb-0 align-self-center">{date}</div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ResourcesCard;
