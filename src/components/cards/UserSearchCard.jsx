/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, Row, Col } from '@/components';
import styles from './UserSearchCard.less';

export default (props) => {
  return (
    <Card className={`${styles.card}`}>
      <div className={`${styles.userSearchBody}`}>
        {
          props.headerTabs ? props.headerTabs :
            <h4 className={`${styles.title}`}>{props.label}</h4>
        }
        <div className={`${styles.divider}`} />
        <div className={`${styles.userSearchContent}`}>
          {props.columns &&
            props.columns.map((column, index) => {
              return (
                <Row key={index} className={`${styles.textRow}`}>
                  <Col span={12}>
                    <div className={`${styles.heading}`}>{column.title}</div>
                  </Col>
                  <Col span={12} className={`${styles.circleTContainer}`}>
                    <div className={`${styles.text}`}>
                      {column.render ? (
                        <column.render data={props.data} rowIndex={index} />
                      ) : (
                          <>{props.data && props.data[column.dataIndex]}</>
                        )}
                    </div>
                  </Col>
                </Row>
              );
            })}
        </div>
      </div>
    </Card>
  );
};
