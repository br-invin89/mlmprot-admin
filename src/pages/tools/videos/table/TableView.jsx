/* eslint-disable no-use-before-define,camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import { DeleteBtn, OutlineBtn, TablePanel, UserTypeBadge, UserStatusBadge } from '@/components';
import { asDate } from '@/utils/text';
import TableHead from './TableHead';
import { stringToArray } from '@/utils/utils';
import Video from '@/pages/tools/videos/VideoCell';
import { deleteVideosApi } from '@/services/tools/videos';
import { t } from '@/utils/label';
import { varLabel } from '@/common/var';
import ActivateBtn from './ActivateBtn';
import styles from '../VideosPage.less';

export default function TableView(props) {
  const { onEditItem } = props;

  const renderShowTo = (values) => {
    if (!values) return t('common.label.none', 'None');

    let showTos = []
    for (let value of values) {
      showTos.push({
        label: varLabel('user.type', value),
        value: value*1
      })
    }

    if (!showTos || showTos.length <= 0) return t( 'common.label.none', 'None');

    return (
      <div className='d-flex align-items-center'>
        {showTos.map(({label, value}, index) =>
          index === showTos.length - 1 ? (
            <UserTypeBadge type={label} />
          ) : (
            <>
              <UserTypeBadge type={label} /> |{' '}
            </>
          ),
        )}
      </div>
    );
  };

  const columns = [
    {
      title: t('common.table.video', 'Video'),
      dataIndex: 'name',
      key: 'name',
      render: (text, { thumbnail, video }) => <Video {...{ text, thumbnail, videoUrl: video }} />,
    },
    {
      title: t('common.table.showTo', 'Show To'),
      dataIndex: 'eligible_user_types',
      key: 'eligible_user_types',
      render: (values) => renderShowTo(stringToArray(values)),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return <UserStatusBadge status={varLabel('video.status', text)} />;
      },
    },
    {
      title: t('pages.videos.category', 'Category'),
      dataIndex: 'video_type',
      key: 'video_type',
      render: (videoType) => {
        return videoType ? <span>{videoType.name}</span> : '';
      },
    },
    {
      title: t('common.table.uploadDate',  'Upload Date'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => {
        return <span>{asDate(text)}</span>;
      },
    },
    {
      title: t('common.table.views', 'Views'),
      dataIndex: 'views',
      key: 'views',
      render: (text) => text,
    },
    {
      title: t('common.table.action', 'Action'),
      dataIndex: 'action',
      key: 'action',
      render: (item, data) => {
        return (
          <span>
            <ActivateBtn data={data} 
              handleSearch={()=>props.loadTable()} className='mr-10' />
            <OutlineBtn
              className="mr-10"
              onClick={() => {
                props.toggle()

                onEditItem(data);
              }}
            >
              {
                t('common.label.edit', 'Edit')}
            </OutlineBtn>
            <DeleteBtn className={styles.deleteBtn} data={data} loadData={props.loadTable} deleteApi={deleteVideosApi} />
          </span>
        );
      },
    },
  ];

  return (
    <TablePanel
      data={props.tableData}
      title={
        t('pages.videos.videos', 'Videos')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          videoTypeList={props.videoTypeList}
          setSearchCategory={props.setSearchCategory}
          searchCategory={props.searchCategory}
        />
      }
      columns={columns}
      onPageChange={props.loadTable}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
