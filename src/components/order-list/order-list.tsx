import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { getOrders } from '@services/orders/selectors.ts';

import type { TOrder } from '@/types/feed.ts';

// import styles from './order-list.module.css';

const OrderList = (): React.JSX.Element => {
  const orders: TOrder[] = useSelector(getOrders);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnClick = (id: string): void => {
    void navigate(`/feed/${id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div style={{ flexBasis: '100%' }}>
      <ul>
        {orders?.map((order): React.JSX.Element => {
          return (
            <li key={order._id}>
              <button onClick={() => handleOnClick(order._id)}>{order.number}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderList;
