import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer, Row, Col } from '@/components';
import TicketInfo from './TicketInfo';
import MessageDetails from './MessageDetails';
import { getTicketInfoApi } from '@/services/support';

const MessagesSubPage = () => {
  const { ticketId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const loadTicketInfo = () => {
    getTicketInfoApi(ticketId, onGetTicketsInfo, onFailTicketsInfo);
  };

  const onGetTicketsInfo = (data) => {
    setData(data);
    setIsLoading(false);
  };

  const onFailTicketsInfo = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    loadTicketInfo();
  }, []);
  
  return (
    <PageContainer>
      <Row gutter={[15, 15]}>
        <Col md={24} lg={14} xl={16}>
          <MessageDetails loadTicketInfo={loadTicketInfo}/>
        </Col>
        <Col md={24} lg={10} xl={8}>
          <TicketInfo isLoading={isLoading} data={data}/>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default MessagesSubPage;
