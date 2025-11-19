import { useEffect } from 'react';

import OrderList from '@components/order-list/order-list.tsx';
import { CONNECT, DISCONNECT } from '@services/orders/actions.ts';
import { useDispatch } from '@services/store.ts';

import type { AppDispatch } from '@services/store.ts';

const ProfileOrders = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    void dispatch(
      CONNECT(`wss://norma.education-services.ru/orders?token=${accessToken?.slice(7)}`)
    );

    return (): void => {
      void dispatch(DISCONNECT());
    };
  }, [accessToken]);

  return <OrderList />;
};

export default ProfileOrders;
