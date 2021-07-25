import { TablePanel, UserAvatar } from '@/components';
import { productSellingData } from '@/common/data';
import styles from './DashboardPage.less';
import { t } from '@/utils/label';

const columns = [
  {
    title: '#',
    dataIndex: 'product_id',
    key: 'product_id',
    render: (data) => {
      return <span>{data}</span>;
    },
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (data) => {
      return (
        <UserAvatar
          image={
            data && data.product_images && data.product_images.length > 0
              ? data.product_images[0].image
              : ''
          }
          title={data && data.title}
        />
      );
    },
  },
  {
    title: 'Units Sold',
    dataIndex: 'products_count',
    key: 'products_count',
    render: () => <span>4444</span>,
  },
  {
    title: 'Sales Total',
    dataIndex: 'products_sale',
    key: 'products_sale',
    render: () => <span>555</span>,
  },
];

export default () => {
  return (
      <div className={`${styles.bestSellingContainer}`}>
        <TablePanel
          data={productSellingData}

          title={t("pages.dashboard.bestSelling", "Best Selling")}
          onPageChange={() => {}}
          columns={columns}
        />
      </div>
  );
};
