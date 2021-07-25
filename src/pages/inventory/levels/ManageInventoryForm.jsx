/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Select,
  Input,
  Button,
  Form,
  SuccessNotification,
  ErrorNotification,
  TextArea,
  message,
} from '@/components';
import styles from './InventoryLevelsSubPage.less';
import { createInventoriesApi } from '@/services/inventories';
import { t } from '@/utils/label';
import { varOptions } from '@/common/var';

const inventoryActionOptions = varOptions('inventory.action');
const reasonsOnInventoryAdd = varOptions('inventory.reasonAdd');
const reasonsOnInventoryRemove = varOptions('inventory.reasonRemove');

const ManageInventoryForm = ({
  products,
  currentDisCenter,
  setReloadtableData,
  reloadTableData,
}) => {
  const [form] = Form.useForm();
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };
  const [action, setAction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onSaveSuccess = (data) => {
    if (data.success) {
      setReloadtableData(!reloadTableData);
      SuccessNotification(data.message);
    } else {
      ErrorNotification(data.message);
    }
    form.resetFields();
    setIsLoading(false);
  };
  const onSaveError = () => {
    setIsLoading(false);
  };
  const onFinish = (values) => {
    if (values.on_hand_amount <= 0) {
      message.error('Count should be greater than 0');
    } else {
      setIsLoading(true);
      const data = {
        ...values,
        dist_center_id: currentDisCenter.value,
      };
      createInventoriesApi(data, onSaveSuccess, onSaveError);
    }
  };

  const handeSelect = (value) => {
    setAction(value);
  };

  return (
    <>
      <div className="product-details-container mt-15">
        <Card className={`${styles.card}`}>
          <Form
            {...layout}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            form={form}
            className="admin-modal"
          >
            <Row className="mb-15">
              <Col span={24}>
                <div className="title">
                  {t('pages.inventory.manageInventory', 'Manage Inventory')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className={`${styles.inputContainer}`}>
                  <Form.Item
                    label={t('common.label.action', 'Action')}
                    className={styles.formFields}
                    name="action"
                    rules={[
                      {
                        required: true,
                        message: t(
                          'common.validation.pleaseSelectUserAction',
                          'Please select Action',
                        ),
                      },
                    ]}
                  >
                    <Select options={inventoryActionOptions} name="action" onChange={handeSelect} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className={`${styles.inputContainer}`}>
                  <Form.Item
                    label={t('common.label.product', 'Product')}
                    name="product_id"
                    className={styles.formFields}
                    rules={[
                      {
                        required: true,
                        message: t(
                          'common.validation.pleaseSelectUserProduct',
                          'Please select Product',
                        ),
                      },
                    ]}
                  >
                    <Select
                      options={products}
                      name="product_id"
                      showSearch
                      optionFilterProp="label"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className={`${styles.inputContainer}`}>
                  <Form.Item
                    label={t('common.label.count', 'Count')}
                    className={styles.formFields}
                    name="on_hand_amount"
                    rules={[
                      {
                        required: true,
                        message: t('common.validation.pleaseEnterCount', 'Please enter Count'),
                      },
                    ]}
                  >
                    <Input type="number" className="width-100p" name="on_hand_amount" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className={`${styles.inputContainer}`}>
                  <Form.Item
                    label={t('common.label.reason', 'Reason')}
                    className={styles.formFields}
                    name="reason"
                    rules={[
                      {
                        required: true,
                        message: t('common.validation.pleaseEnterReason', 'Please enter Reason'),
                      },
                    ]}
                  >
                    <Select
                      options={
                        action === 'add'
                          ? reasonsOnInventoryAdd
                          : action === 'remove'
                          ? reasonsOnInventoryRemove
                          : []
                      }
                      name="reason"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className={`${styles.inputContainer}`}>
                  <Form.Item
                    label={t('common.label.comment', 'Comment (optional)')}
                    name="comment"
                    className={styles.formFields}
                  >
                    <TextArea name="comment" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <Button type="primary" htmlType="submit" loading={isLoading} block>
                  {t('pages.inventory.submit', 'Submit')}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ManageInventoryForm;
