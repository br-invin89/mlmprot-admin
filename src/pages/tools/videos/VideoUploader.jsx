/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Col, Form } from '@/components';
import Dropzone from 'react-dropzone';
import exportImage from '@/assets/images/export.png';
import deleteImage from '@/assets/images/delete-icon.png';
import { getFileNameFromUrl } from '@/utils/utils'

export default (props) => {
  return (
    <div className={`${props.className} p-0 m-0`} style={{ width: props.width ? props.width : 'auto' }}>
      <Row>
        <Col sm={24}>
          {
            props.label ?
              <Row className={'mt-0'}>
                <Col span={24} className="label-container">
                  <div>*{props.label}</div>
                </Col>
              </Row> : null
          }
          <Row className="" gutter={[24, 24]}>
            <Col span={24}>
              <Form>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    props.onChangeFile(acceptedFiles);
                  }}
                  accept="video/*"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                      <div className="dz-message needsclick mt-12" {...getRootProps() }>
                        <input {...getInputProps() } />
                        <div className="mb-15">
                          <img src={exportImage} className="export-img" />
                        </div>
                        <h4 className="drag-text">
                          Drag files or<span> Upload Video</span>
                        </h4>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </Form>
            </Col>
          </Row>
        </Col>

        <Col sm={24} className="mt-15">
          <div className="dropzone-previews" id="file-previews">
            <Row gutter={[24, 24]}>
              {props.files &&
                props.files.map((image, index) => {
                  return (
                    <Col span={24}>
                      <div>
                        <a href={image.preview}>
                          {image.name || getFileNameFromUrl(image.preview)}
                        </a>
                        <img
                          src={deleteImage}
                          className="cancelIcon"
                          style={{
                            position: 'static',
                            marginLeft: 5
                          }}
                          onClick={() => props.onDeleteFile(image.name)}
                        />
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
