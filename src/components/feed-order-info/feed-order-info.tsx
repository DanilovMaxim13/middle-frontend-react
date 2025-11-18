import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getOrders, getTotal, getTotalToday } from '@services/orders/selectors.ts';
import splitArray from '@utils/splitArray.ts';

import type { TOrder } from '@/types/feed.ts';

import styles from './feed-order-info.module.css';

const FeedOrderInfo = (): React.JSX.Element => {
  const total: number | undefined = useSelector(getTotal);
  const totalToday: number | undefined = useSelector(getTotalToday);
  const orders: TOrder[] = useSelector(getOrders);

  const [doneOrders, setDoneOrders] = useState<TOrder[][]>([]);
  const [otherOrders, setOtherOrders] = useState<TOrder[][]>([]);

  useEffect(() => {
    const doneOrders = orders.filter((order) => order.status === 'done');
    const otherOrders = orders.filter((order) => order.status !== 'done');

    setDoneOrders(splitArray<TOrder>(doneOrders, 10));
    setOtherOrders(splitArray<TOrder>(otherOrders, 10));
  }, [orders]);

  return (
    <div className={styles.info}>
      <div className={styles.status_area}>
        <div>
          <h5 className="text text_type_main-medium">Готовы:</h5>
          <div className={styles.columns}>
            {doneOrders.map((numbers, index) => (
              <ul className={styles.list_numbers} key={index}>
                {numbers?.map((order) => {
                  return (
                    <li
                      className={`text text_type_digits-default ${styles.done}`}
                      key={order._id}
                    >
                      {order.number}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text text_type_main-medium">В работе:</h5>
          <div className={styles.columns}>
            {otherOrders.map((numbers, index) => (
              <ul className={styles.list_numbers} key={index}>
                {numbers?.map((order) => {
                  return (
                    <li className="text text_type_digits-default" key={order.number}>
                      {order.number}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h5 className="text text_type_main-medium">Выполнено за все время:</h5>
        <h2 className={`text text_type_digits-large`}>{total}</h2>
      </div>

      <div>
        <h5 className="text text_type_main-medium">Выполнено за сегодня:</h5>
        <h2 className={`text text_type_digits-large`}>{totalToday}</h2>
      </div>
    </div>
  );
};

export default FeedOrderInfo;
