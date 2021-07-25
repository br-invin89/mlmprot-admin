import { TablePanel, CountryFlag } from '@/components';
import canadaImage from '@/assets/images/canada.png';
import { countriesData } from '@/common/data';
import styles from './DashboardPage.less';
import { t } from '@/utils/label';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    render: (id) => <span>{id}</span>,
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    render: (country) => {
      return <CountryFlag image={canadaImage} title={country} />;
    },
  },
  {
    title: 'Active Members',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'Sales This Month',
    dataIndex: 'sales',
    key: 'sales',
    render: (sales) => <span>{sales}</span>,
  },
];

export default () => {
  return (
      <div className={`${styles.topCountriesContainer}`}>
        <TablePanel
          data={countriesData}
          title={t("pages.dashboard.topCountries", "Top Countries")}
          onPageChange={() => {}}
          columns={columns}
        />
      </div>
  );
};
