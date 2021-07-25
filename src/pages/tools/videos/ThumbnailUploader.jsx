/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Col, Form } from '@/components';
import Dropzone from 'react-dropzone';
import deleteImage from '@/assets/icons/cancel.svg';
import exportImage from '@/assets/images/export.png';
import { t } from '@/utils/label';
// eslint-disable-next-line no-unused-vars
import styles from './VideosPage.less'

export default (props) => {
  return (
    <div className={`${props.className} p-0 m-0`} style={{ width: props.width ? props.width : 'auto' }}>
      <Row className={styles.rowThumbnail}>
        <Col sm={24}>
          <Row className={'mt-0'}>
            {
              props.label ? <Col span={24} className="label-container"><div>*{props.label}</div></Col> : null
            }
          </Row>
          <Row className="" gutter={[24, 24]}>
            <Col span={24} className="col-12">
              <Form>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    props.onChangeFile(acceptedFiles);
                  }}
                  accept="image/*"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                      <div className="dz-message needsclick mt-12" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="mb-15">
                          <img src={exportImage} className="export-img" />
                        </div>
                        <h4 className="drag-text">{t('common.label.selectThumbnailImage', 'Select Thumbnail Image')}</h4>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </Form>
            </Col>
          </Row>
        </Col>

        {props.files && props.files.length > 0 && (
          <Row className="mb-15 mt-15">
            <Col xs={24}>
              <div className="dropzone-previews" id="file-previews">
                <Row gutter={[0, 24]} className="product-row">
                  {props.files.map((f, i) => {
                    return (
                      <div className="show-image-container" key={i}>
                        <img
                          data-dz-thumbnail=""
                          height={80}
                          className="product-image"
                          alt={f.name}
                          src={f.preview}
                        />
                        <img
                          src={deleteImage}
                          className="cancelIcon"
                          style={{
                            top: '-8px',
                            right: '-8px',
                            width: '18px',
                            height: '18px',
                          }}
                          onClick={() => props.onDeleteFile(f.name)}
                        />
                      </div>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        )}
      </Row>
    </div>
  );
};
