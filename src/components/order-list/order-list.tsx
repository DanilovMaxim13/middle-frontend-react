import OrderCard from '@components/order-list/order-card.tsx';
import { getOrders } from '@services/orders/selectors.ts';
import { useSelector } from '@services/store.ts';

import type { TOrder } from '@/types/feed.ts';

import styles from './order-list.module.css';

const OrderList = (): React.JSX.Element => {
  const orders: TOrder[] = useSelector(getOrders);

  return (
    <div style={{ flexBasis: '100%' }}>
      <ul className={`${styles.list} custom-scroll`}>
        {orders?.map((order): React.JSX.Element => {
          return (
            <li key={order._id}>
              <OrderCard order={order} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderList;
