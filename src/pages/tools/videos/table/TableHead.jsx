/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Select } from '@/components';
import { t } from '@/utils/label';
import { varOptions } from '@/common/var';

const userTypeOptions = varOptions('user.type')

export default function TableHead(props) {
  const { videoTypeList = [] } = props;

  const videoTypeOptions = videoTypeList.map((videoType) => {
    return {
      label: videoType.name,
      value: videoType.id,
    };
  });

  const onEligibleUserTypesChange = (value) => {
    const searchParam = { ...props.searchParam, eligible_user_types: value };
    props.setSearchParam(searchParam);
  };

  const onVideoTypeOptionChange = (value) => {

    const searchParam = { ...props.searchParam, video_type_id: value };
    props.setSearchParam(searchParam);
    props.setSearchCategory(value)
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <Select
          placeholder={t('pages.news.allEligibilities', 'All Eligibilities')}
          size="medium"
          onChange={onEligibleUserTypesChange}
          options={[
            { 
              label: 'All Eligibilities', 
              value: '' 
            },
            ...userTypeOptions
          ]}
          allowClear
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          placeholder={t('pages.videos.allCategories', 'All Categories')}
          noMarginBottom
          size="medium"
          disable={videoTypeOptions.length <= 0}
          value={props.searchCategory}
          options={[
            {
              label: 'All Categories',
              value: ''
            },
            ...videoTypeOptions
          ]}
          onChange={onVideoTypeOptionChange}
          allowClear
        />
      </div>
    </div>
  );
}
