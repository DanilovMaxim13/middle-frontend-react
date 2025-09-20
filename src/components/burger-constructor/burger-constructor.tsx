import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { BunElement } from '@components/burger-constructor/bun-element/bun-element.tsx';
import { IngredientsList } from '@components/burger-constructor/ingredients-list/ingredients-list.tsx';
import OrderRegistrationModal from '@components/burger-constructor/order-registration-modal/order-registration-modal.tsx';
import Price from '@components/common/price/price.tsx';
import { setBun, setIngredients } from '@services/burger-constructor/actions.ts';
import {
  getCountPrice,
  getIngredients,
} from '@services/burger-constructor/selectors.ts';
import { setOrder } from '@services/order-registration/actions.ts';

import type { AppDispatch } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const currentPrice: number = useSelector(getCountPrice());
  const ingredients: TIngredient[] = useSelector(getIngredients);

  const ref = useRef<HTMLDivElement>(null);
  const [collect, ingredientsRef] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
      getType: monitor.getItemType(),
    }),
    drop: (ingredient: TIngredient) => {
      if (!collect.isHover) return;
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(setIngredients([...ingredients, ingredient]));
      }
    },
  });
  ingredientsRef(ref);

  const handleSetOrder = (): void => {
    setIsOpenModal(true);
    void dispatch(setOrder());
  };

  return (
    <section className={`${styles.burger_constructor_wrapper} pl-4`}>
      <div className={styles.burger_constructor} ref={ref}>
        <BunElement type="top" />

        <IngredientsList />

        <BunElement type="bottom" />
      </div>

      <div className={styles.footer}>
        <Price price={currentPrice} size="md" />
        <Button htmlType="button" onClick={handleSetOrder} size="medium" type="primary">
          Оформить заказ
        </Button>
      </div>

      <OrderRegistrationModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </section>
  );
};
