import React, {useState, useEffect} from 'react';
import { Row, Col, Form, Input, Button, TextArea, SuccessNotification, ErrorNotification } from '@/components';
import Dropzone from 'react-dropzone';
import exportImage from '@/assets/images/export.png';
import { getLogoAndFooterApi, saveLogoAndFooterApi } from '@/services/emailCampaigns/systemEmails';
import { t } from '@/utils/label';

const SystemEmailEditModalContent = ({setActiveLogoAndFooterModal}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogoAndFooter, setIsLoadingLogoAndFooter] = useState(false);
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [footerText, setFooterText] = useState('');
  function handleAcceptedFiles(files) {
    let updatedFile = Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
    });
    setLogoImageFile(updatedFile);
  }

  const onGetLogoAndFooter = (res) => {
    setLogoImageFile({preview: res.data.logo.content});
    setFooterText(res.data.footer.content);
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
    getLogoAndFooter('');
  }, []);

  const handleChange = (e) => {
    setFooterText(e.target.value);
  }

  const onSaveLogoAndFooter = (res) => {
    SuccessNotification(t('common.alert.recordSavedSuccessfully', 'Successfully updated'))
    setIsLoading(false);
    setActiveLogoAndFooterModal(false);
  }

  const onFailedSaveLogoAndFooter = () => {
    ErrorNotification(t('common.alert.somethingwrong', 'Something wrong.'))
    setIsLoading(false);
    setActiveLogoAndFooterModal(false);
  }

  const updateLogoAndFooter = () => {
    setIsLoading(true);
    const formData = new FormData();
    if (logoImageFile.path) formData.append('logo', logoImageFile);
    formData.append('footer', footerText);
    saveLogoAndFooterApi(formData, onSaveLogoAndFooter, onFailedSaveLogoAndFooter);
  }

  const handleSave = () => {
    updateLogoAndFooter();
  }

  return (
    <div>
      <Row className="mb-12">
        <Col span={24} className="col-12">
          <Form>
            <div className="mb-5">Logo image</div>
            <Row>
              <Col>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    handleAcceptedFiles(acceptedFiles);
                  }}
                  accept="image/*"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                      <div className="dz-message needsclick mt-12" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropzone-area">
                          <img src={exportImage} className="export-img" />
                          <div>Drag & Drop</div>
                        </div>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </Col>
              <Col>
                {logoImageFile && <img src={logoImageFile.preview} className="logo-img"/>}
              </Col>
            </Row>
            <div className="mt-15">
              <div className="mb-5">Footer Line</div>
                <TextArea
                  rows={3}
                  name="description"
                  value={footerText}
                  placeholder="Enter system email footer text..."
                  className="footer-text"
                  onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="logo-footer-save-button">
              <Button onClick={handleSave} className="mt-15" loading={isLoading}>Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SystemEmailEditModalContent;