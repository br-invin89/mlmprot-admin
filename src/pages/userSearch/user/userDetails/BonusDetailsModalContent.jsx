import { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Spin } from '@/components';
import styles from './UserDetailsSubPage.less';
import { asPrice, asDate } from '@/utils/text';
import { getUserBonusDetailsApi } from '@/services/userSearch/userDetail';

export default function BonusDetailModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      title: 'Bonus',
      key: 'bonus',
      render: (_, record) => <span>{record.bonus.name}</span>,
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (_, record) => <span>{asPrice(record.amount)}</span>,
    },
    {
      title: 'Earned Date',
      key: 'earned_at',
      render: (_, record) => <span>{asDate(record.earned_at)}</span>,
    },
  ];

  const onGetTableData = (data) => {
    setTableData(data);
    setIsLoading(false);
  };

  const onFailTableData = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.userId) {
      const params = {
        from: moment(props.data.from).format('YYYY-MM-DD'),
        to: moment(props.data.to).format('YYYY-MM-DD'),
        bonusId: props.data.bonus.id,
      };
      setIsLoading(true);
      getUserBonusDetailsApi(props.userId, params, onGetTableData, onFailTableData);
    }
  }, [props.userId]);

  return (
    <div className={styles.bonusDetailModal}>
      <Table
        className={styles.bonusDetailTable}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={{
          spinning: isLoading,
          indicator: <Spin spinning={true} />,
        }}
      />
    </div>
  );
}
