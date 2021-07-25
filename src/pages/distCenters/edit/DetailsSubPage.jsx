/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Row, Col } from '@/components';
import { geCurrenttDistCentersApi } from '@/services/distCenters';
import CountriesTableSection from './details/CountriesTable';
import EditDetailsForm from './details/EditDetailsForm';

const DetailsSubPage = ({distCenterId}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [countries, setCountries] = useState([])

  const loadDetails = () => {
    setIsLoading(true);
    geCurrenttDistCentersApi(distCenterId, onGetDistCenterDetails, onFailDistCenterDetails);
  };

  const onGetDistCenterDetails = (data) => {
    setDetails(data.data[0]);
    setCountries(data.data[0].countries)
    setIsLoading(false);
  };

  const onFailDistCenterDetails = () => {
    setIsLoading(false);
  };

  const updateCountry = (data) => {
    setCountries([
      ...countries.map((d) => d),
      data
    ])
  }

  const removeCountry = (country) => {
    setCountries([
      ...countries.filter((d) => d.country !== country),
    ])
  }

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <>
      <Row gutter={[15, 15]}>
        <Col xs={24} xl={12}>
          <CountriesTableSection isLoading={isLoading} countries={countries} updateCountry={updateCountry} removeCountry={removeCountry}/>
        </Col>
        <Col xs={24} xl={12}>
          <EditDetailsForm  loading={isLoading} details={details} countries={countries}/>
        </Col>
      </Row>
    </>
  );
};

export default DetailsSubPage;
