import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  TextArea,
  Spin,
  OutlineBtn,
  message,
  SuccessNotification,
} from '@/components';
import { asDateTime } from '@/utils/text';
import { getTicketsMessagesApi, createTicketMessagesApi } from '@/services/support';
import styles from './MessagesSubPage.less';
import { getUser } from '@/utils/localStorage';

const MessagesSubPage = ({ loadTicketInfo }) => {
  const currentUser = getUser();
  const { ticketId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [msg, setMessage] = useState('');
  const [data, setData] = useState({});

  const loadTicketMessages = () => {
    setIsLoading(true);
    getTicketsMessagesApi(ticketId, onGetTicketsMessages, onFailTicketsMessages);
  };

  const onGetTicketsMessages = (data) => {
    setData(data && data.length > 0 ? data[0] : {});
    setIsLoading(false);
  };

  const onFailTicketsMessages = () => {
    setIsLoading(false);
  };

  const addMessage = () => {
    if (!msg) {
      message.error('Enter Message');
      return;
    }
    let query = {
      ticket_id: ticketId,
      message: msg,
    };
    setIsCreateLoading(true);
    createTicketMessagesApi(query, onCreateMessageSuccess, onCreateMessageFail);
  };

  const onCreateMessageSuccess = (d) => {
    let newMessage = {
      ...d,
      sender_info: {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        image: currentUser.image
      }
    }
    setData({
      ...data,
      messages: [...data.messages.map((el) => el), newMessage],
    });
    loadTicketInfo()
    SuccessNotification('Sent Successfully');
    setMessage('');
    setIsCreateLoading(false);
  };

  const onCreateMessageFail = () => {
    setIsCreateLoading(false);
  };

  useEffect(() => {
    loadTicketMessages();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spin spinning={true} className="mb-15" />
      ) : (
        <Card>
          <Row>
            <Col span={24}>
              <div className={styles.topContent}>
                <Link style={{ textDecoration: 'underline' }} to={`/support`}>
                  Tickets
                </Link>{' '}
                &gt; Ticket #{data.uuid}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={styles.cardTitle}>{data.subject}</div>
            </Col>
          </Row>
          <div className={styles.divider} />
          {data?.messages &&
            data.messages.length > 0 &&
            data.messages.map((el) => (
              <Row>
                <Col span={24}>
                  <div className={`${styles.container}`}>
                    <img
                      className={`${styles.imageContainer}`}
                      src={el.sender_info?.image}
                      alt=""
                    />
                    <div>
                      <div
                        className={styles.name}
                      >{`${el.sender_info?.first_name} ${el.sender_info?.last_name}`}</div>
                      <div className={styles.date}>{asDateTime(el.created_at)}</div>
                    </div>
                  </div>
                </Col>
                <Col span={24}>
                  <pre className={styles.message}>{el.message}</pre>
                </Col>
                <Col span={24}>
                  <div className={styles.divider} />
                </Col>
              </Row>
            ))}
          <Row>
            <Col span={24}>
              <div className={`${styles.inputContainer}`}>
                <img src={currentUser.image} className={`${styles.imageContainer}`} />
                <div className={styles.textContainer}>
                  <TextArea
                    className={styles.textInput}
                    rows={5}
                    value={msg}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col span={24} className={styles.btn}>
              <OutlineBtn loading={isCreateLoading} onClick={addMessage}>
                Submit
              </OutlineBtn>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default MessagesSubPage;
