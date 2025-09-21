import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import DetailsIngredient from '@components/burger-ingredients/burger-ingredients-card/details-ingredient/details-ingredient.tsx';
import Price from '@components/common/price/price.tsx';
import Modal from '@components/modal/modal.tsx';
import { getCounterIngredient } from '@services/burger-constructor/selectors.ts';

import type { TIngredient } from '@/utils/types';

import styles from './burger-ingredients-card.module.css';

type PropsIngredientCard = {
  ingredient: TIngredient;
};

const BurgerIngredientCard = ({
  ingredient,
}: PropsIngredientCard): React.JSX.Element => {
  const counter: number = useSelector(getCounterIngredient(ingredient._id));

  const ref = useRef<HTMLDivElement>(null);
  const [, ingredientsRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
  });
  ingredientsRef(ref);

  const { image, price, name } = ingredient;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.burger_ingredients_item}
        onClick={() => setIsOpenModal(true)}
        ref={ref}
      >
        <img src={image} alt={name} />
        <Price price={price} size="sm" />
        <p className="text text_type_main-default mt-2 mb-6">{name}</p>
        {!!counter && <Counter count={counter} size="default" />}
      </div>

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Детали ингредиента"
      >
        <DetailsIngredient ingredientId={ingredient._id} />
      </Modal>
    </>
  );
};

export default BurgerIngredientCard;
