import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import Price from '@components/common/price/price.tsx';
import { getCounterIngredient } from '@services/burger-constructor/selectors.ts';
import { useSelector } from '@services/store.ts';

import type { TIngredient } from '@/utils/types';

import styles from './burger-ingredients-card.module.css';

type PropsIngredientCard = {
  ingredient: TIngredient;
};

const BurgerIngredientCard = ({
  ingredient,
}: PropsIngredientCard): React.JSX.Element => {
  const counter: number = useSelector(getCounterIngredient(ingredient._id));
  const location = useLocation();

  const ref = useRef<HTMLDivElement>(null);
  const [, ingredientsRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
  });
  ingredientsRef(ref);

  const { _id, image, price, name } = ingredient;

  return (
    <Link
      to={`/ingredients/${_id}`}
      state={{ backgroundLocation: location }}
      className={styles.link}
    >
      <div className={styles.burger_ingredients_item} ref={ref}>
        <img src={image} alt={name} />
        <Price price={price} size="sm" />
        <p className="text text_type_main-default mt-2 mb-6">{name}</p>
        {!!counter && <Counter count={counter} size="default" />}
      </div>
    </Link>
  );
};

export default BurgerIngredientCard;
