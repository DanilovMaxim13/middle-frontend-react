import { useSelector } from 'react-redux';

import { getIngredientById } from '@services/burger-ingredients/selectors.ts';

import type React from 'react';

import styles from './details-ingredient.module.css';

type PropsDetailsIngredient = {
  ingredientId: string;
};

const DetailsIngredient = ({
  ingredientId,
}: PropsDetailsIngredient): React.JSX.Element => {
  const ingredient = useSelector(getIngredientById(ingredientId));

  if (!ingredient) {
    return <div className={styles.error}>Не удалось загрузить данные!</div>;
  }

  return (
    <div className={styles.modal}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h5 className="text text_type_main-medium">{ingredient.name}</h5>
      <ul className={`${styles.list} text_type_main-default`}>
        <li className={styles.list_item}>
          <div>Калории,ккал</div>
          <div>{ingredient.calories}</div>
        </li>
        <li className={styles.list_item}>
          <div>Белки,г</div>
          <div>{ingredient.proteins}</div>
        </li>
        <li className={styles.list_item}>
          <div>Жиры,г</div>
          <div>{ingredient.fat}</div>
        </li>
        <li className={styles.list_item}>
          <div>Углеводы,г</div>
          <div>{ingredient.carbohydrates}</div>
        </li>
      </ul>
    </div>
  );
};

export default DetailsIngredient;
