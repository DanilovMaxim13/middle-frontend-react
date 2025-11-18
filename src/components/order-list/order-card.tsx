import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Price from '@components/common/price/price.tsx';
import { getIngredientsSelector } from '@services/burger-ingredients/selectors.ts';

import type { TOrder } from '@/types/feed.ts';
import type { TIngredient } from '@utils/types.ts';

import styles from './order-list.module.css';

const STATUS = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится',
};

const OrderCard = ({ order }: { order: TOrder }): React.JSX.Element => {
  const location = useLocation();
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  const { imgIngredients, totalPrice } = useMemo(() => {
    let totalPrice = 0;
    const imgIngredients = [];

    for (let i = 0; i < order.ingredients.length; i++) {
      const ingredient = ingredients.find((item) => item._id === order.ingredients[i]);

      if (!ingredient) continue;

      const { image_large, price } = ingredient;
      totalPrice += price;

      if (i <= 6) {
        if (i === 6) {
          imgIngredients.push(
            <li key={i}>
              <img src={image_large} alt="ingredient" />
              <div className={'text text_type_digits-default'}>
                +{ingredients.length - i}
              </div>
            </li>
          );
        } else {
          imgIngredients.push(
            <li key={i}>
              <img src={image_large} alt="ingredient" />
            </li>
          );
        }
      }
    }

    return { imgIngredients, totalPrice };
  }, [order, ingredients]);

  return (
    <Link
      to={order._id}
      className={styles.block}
      state={{ backgroundLocation: location }}
    >
      <div className={styles.head}>
        <div className="text text_type_main-medium">#{order.number}</div>
        <div className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </div>
      </div>
      <div className="text text_type_main-medium">{order.name}</div>
      {location.pathname === '/profile/orders' && (
        <div className="mb-15">
          <div className="text text_type_main-default">{STATUS[order.status]}</div>
        </div>
      )}
      <div className={styles.ingredients}>
        <ul>{imgIngredients}</ul>
        <div className={'text text_type_digits-default'}>
          <Price price={totalPrice} size="sm" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
