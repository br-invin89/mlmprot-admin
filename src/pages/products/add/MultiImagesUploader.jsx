/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col, Form } from '@/components';
import Dropzone from 'react-dropzone';
import exportImage from '@/assets/images/export.png';
import deleteImage from '@/assets/icons/cancel.svg';

export default ({
  uploadImageText,
  className,
  label,
  files,
  onDeleteFile,
  onChangeFile,
  size,
  dropZoneProps,
  width,
  dragFileText,
  multiple = true
}) => {
  return (
    <div className={`${className}`} style={{ width: width || 'auto' }}>
      {label ? (
        <Row className={'mb-10'}>
          <Col className="label-container">
            <div>{label}</div>
          </Col>
        </Row>
      ) : null}
      {files && files.length > 0 && (
        <Row className={`mt-25 mb-20 product-d`}>
          <Col sm={24}>
            <div className="dropzone-previews" id="file-previews">
              <Row gutter={[24, 24]}>
                {files.map((f, i) => {
                  return (
                    <Col xs={12} sm={12} md={12} lg={6} xl={4} {...size} key={i}>
                      <div className="show-image-container">
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
                          onClick={() => onDeleteFile(f.name)}
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      )}
      <Row className="mb-12">
        <Col span={24} className="col-12">
          <Form>
            <Dropzone
              onDrop={(acceptedFiles) => {
                onChangeFile(acceptedFiles);
              }}
              accept="image/*"
              multiple={multiple}
              {...dropZoneProps}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone">
                  <div className="dz-message needsclick mt-12" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="mb-15">
                      <img src={exportImage} className="export-img" />
                    </div>
                    <h4 className="drag-text">
                      {dragFileText || 'Drag files'} or<span> {uploadImageText || 'Upload Images'} </span>
                    </h4>
                  </div>
                </div>
              )}
            </Dropzone>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
