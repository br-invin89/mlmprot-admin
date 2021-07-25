import React, { useState } from 'react';
import { OutlineBtn, Popconfirm, SuccessNotification } from '@/components';
import { t } from '@/utils/label';

export default function DeleteBtn(props) {
  const { data, onDeleteError, onDeleteSuccess, loadData, deleteApi } = props;
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteApiSuccess = (resp) => {
    SuccessNotification(t('common.alert.dataHasDeleted', 'Data has been deleted'));
    setIsDeleting(false);
    setTimeout(() => {
      if (onDeleteSuccess) {
        onDeleteSuccess(resp, data);
      }
  
      if (loadData) {
        loadData();
      }  
    }, 300)
  };

  const onDeleteApiError = (resp) => {
    setIsDeleting(false);
    if (onDeleteError) {
      onDeleteError(resp, data);
    }
  };

  const onConfirmDeleteItem = () => {
    try {
      if (deleteApi) {
        setIsDeleting(true);
        deleteApi(
          data.id,
          (resp) => {
            onDeleteApiSuccess(resp);
          },
          (resp) => {
            onDeleteApiError(resp);
          },
        );
      }
    } catch (e) {
      console.log('Error while deleting item', e);
    }
  };

  return (
    <Popconfirm
      title={t('common.label.areYouSure', 'Are you sure?')}
      okText={t('common.label.yes', 'Yes')}
      cancelText={t('common.label.no', 'No')}
      onConfirm={onConfirmDeleteItem}
    >
      <OutlineBtn danger loading={isDeleting} disabled={isDeleting}>
        {t('common.label.delete', 'Delete')}
      </OutlineBtn>
    </Popconfirm>
  );
}
