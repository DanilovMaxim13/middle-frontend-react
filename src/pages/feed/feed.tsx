import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import FeedOrderInfo from '@components/feed-order-info/feed-order-info.tsx';
import OrderList from '@components/order-list/order-list.tsx';
import { CONNECT, DISCONNECT } from '@services/orders/actions.ts';

import type { AppDispatch } from '@services/store.ts';

import styles from './feed.module.css';

const FeedPage = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(CONNECT('wss://norma.education-services.ru/orders/all'));

    return (): void => {
      void dispatch(DISCONNECT());
    };
  }, []);

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large pt-10 mb-5">Лента заказов</h2>
      <div className={styles.feed}>
        <OrderList />
        <FeedOrderInfo />
      </div>
    </section>
  );
};

export default FeedPage;
