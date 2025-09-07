import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import DetailsIngredientModal from '@components/burger-ingredients/burger-ingredients-card/details-ingredient-modal/details-ingredient-modal.tsx';
import Price from '@components/common/price/price.tsx';

import type { TIngredient } from '@/utils/types';

import styles from './burger-ingredients-card.module.css';

type PropsIngredientCard = {
  ingredient: TIngredient;
};

const BurgerIngredientCard = ({
  ingredient,
}: PropsIngredientCard): React.JSX.Element => {
  const { image, price, name } = ingredient;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.burger_ingredients_item}
        onClick={() => setIsOpenModal(true)}
      >
        <img src={image} alt={name} />
        <Price price={price} size="sm" />
        <p className="text text_type_main-default mt-2 mb-6">{name}</p>
        <Counter count={2} size="default" />
      </div>

      <DetailsIngredientModal
        title="Детали ингредиента"
        isOpen={isOpenModal}
        ingredient={ingredient}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default BurgerIngredientCard;
