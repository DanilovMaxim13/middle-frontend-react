import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import Price from '@components/common/price/price.tsx';
import IngredientsList from '@components/ingredients-list/ingredients-list.tsx';
import { CONNECT, DISCONNECT } from '@services/orders/actions.ts';
import { getOrders } from '@services/orders/selectors.ts';

import type { TOrder } from '@/types/feed.ts';
import type { AppDispatch } from '@services/store.ts';

import styles from './order-card-info.module.css';

const STATUS = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится',
};

const OrderCardInfo = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);
  const location = useLocation();
  const { id } = useParams();
  const currentOrder = orders.find((order) => order._id === id);
  const state = location.state as { backgroundLocation: Location };
  const accessToken = localStorage.getItem('accessToken') ?? '';
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!state?.backgroundLocation) {
      if (location.pathname.includes('/profile/orders')) {
        void dispatch(
          CONNECT(
            `wss://norma.education-services.ru/orders?token=${accessToken?.slice(7)}`
          )
        );
      } else {
        void dispatch(CONNECT('wss://norma.education-services.ru/orders/all'));
      }

      return (): void => {
        void dispatch(DISCONNECT());
      };
    }
  }, [accessToken]);

  if (!currentOrder) {
    return <>Нет такого элемента!</>;
  }

  return (
    <div className={styles.content}>
      <div className={`text text_type_digits-default mb-10 ${styles.order_number}`}>
        #{currentOrder?.number}
      </div>
      <div className="text text_type_main-medium mb-3">{currentOrder.name}</div>
      <div className="mb-15">
        <div className="text text_type_main-default">{STATUS[currentOrder.status]}</div>
      </div>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <IngredientsList order={currentOrder} setTotalPrice={setTotalPrice} />
      <div className={styles.bottom}>
        <FormattedDate
          date={new Date(currentOrder.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={'text text_type_digits-default'}>
          <Price price={totalPrice} size="sm" />
        </div>
      </div>
    </div>
  );
};

export default OrderCardInfo;
