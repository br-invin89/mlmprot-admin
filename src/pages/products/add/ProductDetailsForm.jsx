/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Row, Col, Card, FormItem, Input, Checkbox, TextArea } from '@/components';
import MultiImagesUploader from './MultiImagesUploader';
import styles from './AddProductPage.less';

const ProductDetailsForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    pdf_link: '',
    priority: '',
    is_pc: '',
    is_tc: '',
    is_sample: '',
    pc_amount: 0,
    sc_amount: 0,
  });
  const [image, setImage] = useState(undefined);
  const [thumbnails, setThumbnails] = useState([]);

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.onFormData(field, value);
  };
  const onChangeImage = (files) => {
    let imageData;
    files.map((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        imageData = Object.assign(file, {
          preview: fileReader.result,
        });
        props.onFormData('image', imageData);
      };
    });
  };
  const onChangeThumbnails = (files) => {
    const imageDatas = [];
    thumbnails.map((el) => {
      imageDatas.push({ preview: el.preview, name: el.name });
    });
    files.map((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        imageDatas.push({ preview: fileReader.result, name: file.name });
      };
    });

    setTimeout(() => {
      props.onFormData('thumbnails', imageDatas);
    }, 1000);
  };
  const onDeleteImage = () => {
    props.onFormData('image', undefined);
  };
  const onDeleteThumbnail = (name) => {
    const thumbnails0 = thumbnails.filter((el) => el.name !== name);
    props.onFormData('thumbnails', thumbnails0);
  };

  useEffect(() => {
    if (props.formData) {
      const formData0 = {
        title: props.formData.title,
        subtitle: props.formData.subtitle,
        path: props.formData.path,
        description: props.formData.description,
        video_description: props.formData.video_description,
        pdf_link: props.formData.pdf_link,
        priority: props.formData.priority,
        from_site: props.formData.from_site,
        benefits: props.formData.benefits,
        details: props.formData.details,
        is_pc: props.formData.is_pc,
        is_tc: props.formData.is_tc,
        is_sample: props.formData.is_sample,
        pc_amount: props.formData.pc_amount,
        sc_amount: props.formData.sc_amount,
      };
      setImage(props.formData.image);
      setFormData(formData0);

      const thumbnails0 = props.formData.thumbnails.map((el) => ({
        preview: el.preview,
        name: el.name || `fromDb_${el.id}xxx`,
      }));
      setThumbnails(thumbnails0);
    }
  }, [props.formData]);

  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.card}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">{t('pages.products.productDetails', 'Product Details')}</div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'* Title'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'title')}
                >
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={(e) => onFormData('title', e.target.value)}
                    className={
                      props.errorMessages.filter((el) => el.type === 'title').length > 0
                        ? styles.titleInputError
                        : ''
                    }
                  />
                </FormItem>
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'SubTitle (Optional)'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'subtitle')}
                >
                  <Input
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => onFormData('subtitle', e.target.value)}
                    className={
                      props.errorMessages.filter((el) => el.type === 'subtitle').length > 0
                        ? styles.titleInputError
                        : ''
                    }
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'Description (Optional)'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'description')}
                >
                  <TextArea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => onFormData('description', e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'Document PDF Link (Optional)'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'pdf_link')}
                >
                  <Input
                    value={formData.pdf_link}
                    onChange={(e) => onFormData('pdf_link', e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <FormItem errorMessages={props.errorMessages.filter((el) => el.type === 'image')}>
                <MultiImagesUploader
                  size={{ xs: 12, sm: 12, md: 8, lg: 6, xl: 4 }}
                  className="upload-container-product"
                  files={image ? [image] : []}
                  onChangeFile={onChangeImage}
                  onDeleteFile={onDeleteImage}
                  label="* Product Image"
                  width="100%"
                  multiple={false}
                  uploadImageText={'Upload Image'}
                  dragFileText={'Drag file'}
                />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <FormItem
                errorMessages={props.errorMessages.filter((el) => el.type === 'thumbnails')}
              >
                <MultiImagesUploader
                  size={{ xs: 12, sm: 12, md: 8, lg: 6, xl: 4 }}
                  className="upload-container-product"
                  files={thumbnails}
                  onChangeFile={onChangeThumbnails}
                  onDeleteFile={onDeleteThumbnail}
                  label="Product Detail Images (Optional)"
                  width="100%"
                />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'* Priority'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'priority')}
                >
                  <Input
                    name="priority"
                    onChange={(e) => onFormData('priority', e.target.value)}
                    value={formData.priority}
                    type="number"
                    className={
                      props.errorMessages.filter((el) => el.type === 'priority').length > 0
                        ? styles.priorityInputError
                        : ''
                    }
                  />
                </FormItem>
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6} className={styles.productTypeColumn}>
              <Checkbox
                className={`${styles.isPcCheckbox}`}
                label="This is Sample Product"
                name="is_sample"
                checked={formData.is_sample === 1}
                onChange={(e) => onFormData('is_sample', e.target.checked ? 1 : 2)}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6} className={styles.productTypeColumn}>
              <Checkbox
                className={`${styles.isPcCheckbox}`}
                label="This is Product Credit Item"
                name="is_pc"
                checked={formData.is_pc === 1}
                onChange={(e) => onFormData('is_pc', e.target.checked ? 1 : 2)}
              />
              {formData.is_pc === 1 && (
                <div className={`${styles.inputContainer}`}>
                  <FormItem
                    label={'PC Amount'}
                    errorMessages={props.errorMessages.filter((el) => el.type === 'pc_amount')}
                  >
                    <Input
                      name="pc_amount"
                      onChange={(e) => onFormData('pc_amount', e.target.value)}
                      value={formData.pc_amount}
                      type="number"
                      className={
                        props.errorMessages.filter((el) => el.type === 'pc_amount').length > 0
                          ? styles.priorityInputError
                          : ''
                      }
                    />
                  </FormItem>
                </div>
              )}
              {formData.is_pc === 1 && (
                <div className={`${styles.inputContainer}`}>
                  <FormItem
                    label={'SC Amount'}
                    errorMessages={props.errorMessages.filter((el) => el.type === 'sc_amount')}
                  >
                    <Input
                      name="sc_amount"
                      onChange={(e) => onFormData('sc_amount', e.target.value)}
                      value={formData.sc_amount}
                      type="number"
                      className={
                        props.errorMessages.filter((el) => el.type === 'sc_amount').length > 0
                          ? styles.priorityInputError
                          : ''
                      }
                    />
                  </FormItem>
                </div>
              )}
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6} className={styles.productTypeColumn}>
              <Checkbox
                className={`${styles.isPcCheckbox}`}
                label="This is Top-up Product Credit Item"
                name="is_tc"
                checked={formData.is_tc === 1}
                onChange={(e) => onFormData('is_tc', e.target.checked ? 1 : 2)}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default ProductDetailsForm;
