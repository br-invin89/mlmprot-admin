import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Collapse,
  Input,
  Alert,
  TablePanel,
  AddEditModal,
  FormItem,
} from '@/components';
import { asPrice } from '@/utils/text';
import { t } from '@/utils/label';
import { countryName } from '@/utils/country';
import { loadDistCenterOptionsApi } from '@/services/common';
import CustomShippingModalContent from './CustomShippingModalContent';
import styles from './AddProductPage.less';

const { Panel } = Collapse;

const ShippingForm = (props) => {
  const [currentDistCenter, setCurrentDistCenter] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    general_shipping_price: '',
    weight_unit: '',
    weight_value: '',
  });
  const [distCenters, setDistCenters] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const editToggle = () => {
    setEditOpen(!editOpen);
  };

  const onGetDistCenters = (data) => {
    setDistCenters(data);
  };

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.onFormData(field, value);
  };

  const removeShippingGroups = (distCenter) => {
    const shippingPrices0 = props.formData.shipping_prices.filter(
      (el) => el.dist_center_id !== distCenter.id,
    );
    props.onFormData('shipping_prices', shippingPrices0);
  };

  useEffect(() => {
    loadDistCenterOptionsApi(onGetDistCenters);
  }, []);

  useEffect(() => {
    if (props.formData) {
      setFormData({
        general_shipping_price: props.formData.general_shipping_price,
        weight_unit: props.formData.weight_unit,
        weight_value: props.formData.weight_value,
      });
    }
  }, [props.formData]);

  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.card}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">{t('pages.products.shipping', 'Shipping')}</div>
            </Col>
          </Row>
          {props.formData.is_digital !== 1 && (
            <>
              <Row gutter={[15, 15]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <div className={`${styles.inputContainer}`}>
                    <FormItem
                      label={'* General Shipping Rate '}
                      errorMessages={props.errorMessages.filter(
                        (el) => el.type === 'general_shipping_price',
                      )}
                    >
                      <Input
                        value={formData.general_shipping_price}
                        type="number"
                        onChange={(e) => onFormData('general_shipping_price', e.target.value)}
                        className={(props.errorMessages.filter((el) => el.type === 'general_shipping_price').length > 0) ? styles.generalShippingRateError : ''}
                      />
                    </FormItem>
                  </div>
                </Col>
              </Row>
              <Row gutter={[15, 15]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={20} className="alert-container">
                  <Alert
                    color="info"
                    content={
                      <div>
                        <div className="mb-15">
                          General Shipping Rate will be used only when the system can not find any
                          shipping rates in the Custom ShippingRates.
                        </div>
                        <div>
                          Custom Shipping Rates will be set for each distribution centers and their
                          shipping groups.
                        </div>
                        <div>
                          The Rates will be based on Units. For example, the first Units 5, Price
                          $75 means that the system will ask shipping price $75 from Units 1 to
                          Units 5. Units 10, Price $80 means that the system will ask shipping price
                          $80 from Units 6 to Units 10
                        </div>
                      </div>
                    }
                    title="Info"
                  />
                </Col>
              </Row>
              <Row gutter={[15, 15]} className="mt-15 mb-15">
                <Col xs={24} sm={24}>
                  <div className="title ship-label">Custom Shipping Rates</div>
                </Col>
              </Row>
              <Row gutter={[15, 15]} className="mb-15">
                <Col xs={24} sm={24}>
                  <Collapse>
                    {distCenters.map((distCenter, index) => (
                      <Panel
                        header={
                          <div className="shipping-container">
                            <div className="labe pl-1">{distCenter.name}</div>
                          </div>
                        }
                        collapsible="header"
                        extra={
                          <span className={styles.shippingActions}>
                            <span
                              onClick={() => {
                                setCurrentDistCenter(distCenter);
                              }}
                            >
                              <AddEditModal
                                triggerLabel={t('common.label.edit', 'Edit')}
                                triggerClass="btn btn-pinkBlue waves-effect waves-light w-100 d-flex align-items-center"
                                modalTitle={currentDistCenter && currentDistCenter.name}
                                open={currentDistCenter.id === distCenter.id && editOpen}
                                toggle={() => {
                                  editToggle();
                                }}
                                onClose={() => {
                                  setShowEdit(!showEdit);
                                }}
                                width="750px"
                                isLink
                              >
                                <CustomShippingModalContent
                                  shipping_prices={props.formData.shipping_prices}
                                  toggle={editToggle}
                                  dist_center_id={currentDistCenter && currentDistCenter.id}
                                  onFormData={onFormData}
                                  showEdit={showEdit}
                                />
                              </AddEditModal>
                            </span>
                            <span
                              onClick={() => removeShippingGroups(distCenter)}
                              className={styles.shippingDeleteText}
                            >
                              Delete
                            </span>
                          </span>
                        }
                        key={index}
                      >
                        <div>
                          <Row gutter={[15, 0]} className="mt-4 pl-4 table-shipping">
                            <Col xs={24}>
                              <TablePanel
                                data={props.formData.shipping_prices.filter(
                                  (el) => el.dist_center_id === distCenter.id,
                                )}
                                hideTopHeader
                                columns={[
                                  {
                                    title: '#',
                                    dataIndex: 'index',
                                    key: 'index',
                                    render: (_, __, index2) => <span>{index2 + 1}</span>,
                                  },
                                  {
                                    title: 'Delivery Country',
                                    dataIndex: 'country',
                                    key: 'country',
                                    render: (text) => <span>{countryName(text)}</span>,
                                  },
                                  {
                                    title: 'Units(From)',
                                    dataIndex: 'units_start',
                                    key: 'units_start',
                                  },
                                  {
                                    title: 'Units(To)',
                                    dataIndex: 'units_end',
                                    key: 'units_end',
                                  },
                                  {
                                    title: 'Unit Price',
                                    dataIndex: 'shipping_price',
                                    key: 'shipping_price',
                                    render: (text) => <span>{asPrice(text)}</span>,
                                  },
                                ]}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Panel>
                    ))}
                  </Collapse>
                </Col>
              </Row>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default ShippingForm;
