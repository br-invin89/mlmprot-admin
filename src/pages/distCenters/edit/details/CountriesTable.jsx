import React, { useState } from 'react';
import { Col, OutlineBtn, Row, Select, TablePanel, CountryFlag, message, Popconfirm } from '@/components';
import { countryOptions } from '@/utils/country';
import { t } from '@/utils/label';

const CountriesTable = ({ isLoading, countries, updateCountry, removeCountry }) => {
  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (text) => {
        return <CountryFlag country={text} />;
      },
    },
    {
      title: 'Action',
      dataIndex: 'country',
      key: 'country',
      render: (text) => {
        return (
          <span>
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => {
                if (countries.length === 1) {
                  message.error("You cannot remove the last country")
                } else {
                  removeCountry(text)
                }
              }}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
            <OutlineBtn danger>
              {t("pages.distCenter.remove", "Remove")}
            </OutlineBtn>

            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const [country, setCountry] = useState('');

  const handleSelect = (value) => {
    setCountry(value);
  };

  const addCountry = () => {
    if (country) {
      const filter = countries.filter((d) => d.country === country)
      if (filter.length > 0) {
        message.error("This Country already exists")
      } else {
        const data = {
          country,
        };
        updateCountry(data);
        setCountry('')
      }
    } else {
      message.error('Select Country');
    }
  };

  return (
    <>
      <Row gutter={[15, 15]}>
        <Col xs={24}>
          <TablePanel
            data={countries && countries.length > 0 ? countries : []}
            title={t("pages.distCenter.countries", "Countries")}
            toolbar={
              <div className="toolbar-container">
                <div className="toolbar-sub-container">
                  <Select
                    placeholder="Select Country"
                    style={{ minWidth: '162px' }}
                    size="medium"
                    showSearch
                    options={
                      new Set([
                        {
                          label: 'Select Country',
                          value: '',
                        },
                        ...countryOptions(),
                      ])
                    }
                    onChange={handleSelect}
                    value={country}
                  />
                </div>
                <div className="toolbar-sub-container">
                  <OutlineBtn className="btn-34" onClick={addCountry}>
                    {t("pages.distCenter.add", "Add")}
                  </OutlineBtn>
                </div>
              </div>
            }
            loading={isLoading}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
};

export default CountriesTable;
