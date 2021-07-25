/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Link } from 'react-router-dom';
import { t } from '@/utils/label';
import { Row, Col } from '@/components';
import UserSearchInfoCard from './UserSearchInfoCard';
import { varLabel } from '@/common/var';

const UserInfoCard = (props) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <UserSearchInfoCard
            label={t('pages.userSearch.userInfo', 'User Info')}
            columns={[
              {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
              },
              {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
              },
              {
                title: 'Enroller',
                key: 'enroller',
                render: ({ data }) =>
                  data && data.sponsor ? (
                    <Link
                      to={`/user/detail/${data.sponsor.id}`}
                    >{`${data.sponsor.first_name} ${data.sponsor.last_name}`}</Link>
                  ) : (
                    '...'
                  ),
              },
              {
                title: 'Type',
                key: 'type',
                render: ({ data }) =>
                  data && data.type ? varLabel('user.type', data.type) : '...',
              },
              {
                title: 'PV',
                key: 'pv',
                render: ({ data }) => (
                  <span>{data && data.qualification ? data.qualification.pv : '...'}</span>
                ),
              },
              {
                title: 'GV',
                key: 'gv',
                render: ({ data }) => (
                  <span>{data && data.qualification ? data.qualification.gv : '...'}</span>
                ),
              },
              {
                title: 'Replicated Website',
                key: 'website',
                render: () => (
                  <a
                    href={`${REACT_APP_ECOMMERCE}/e/${props.userData && props.userData.username}`}
                    target="_blank"
                  >
                    <p style={{ textAlign: 'right' }}>
                      {`${REACT_APP_ECOMMERCE}/e/${props.userData && props.userData.username}`}
                    </p>
                  </a>
                ),
              },
            ]}
            data={props.userData}
            isLoading={props.isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserInfoCard;
