import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import OrderRegistrationModal from '@components/burger-constructor/order-registration-modal/order-registration-modal.tsx';
import Price from '@components/common/price/price.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <section className={`${styles.burger_constructor_wrapper} pl-4`}>
      <div className={styles.burger_constructor}>
        <ConstructorElement
          extraClass={`${styles.constructor_element} ml-8 mr-4`}
          isLocked
          price={ingredients[0]?.price}
          text={`${ingredients[0]?.name} (верх)`}
          thumbnail={ingredients[0]?.image}
          type="top"
        />

        <div className={`${styles.ingredients_list} custom-scroll`}>
          {ingredients.slice(1).map((ingredient: TIngredient) => (
            <div className={styles.ingredient} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                price={ingredient.price}
                text={ingredient.name}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>

        <ConstructorElement
          extraClass={`${styles.constructor_element} ml-8 mr-4`}
          isLocked
          price={ingredients[0]?.price}
          text={`${ingredients[0]?.name} (низ)`}
          thumbnail={ingredients[0]?.image}
          type="bottom"
        />
      </div>

      <div className={styles.footer}>
        <Price price={610} size="md" />
        <Button
          htmlType="button"
          onClick={() => setIsOpenModal(true)}
          size="medium"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>

      <OrderRegistrationModal
        number="034536"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </section>
  );
};
