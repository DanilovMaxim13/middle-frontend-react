import { useEffect, useMemo } from 'react';

import { getIngredientsSelector } from '@services/burger-ingredients/selectors.ts';
import { useSelector } from '@services/store.ts';

import type { TOrder } from '@/types/feed.ts';
import type { TIngredient } from '@utils/types.ts';

import styles from './ingredients-list.module.css';

const IngredientsList = ({
  order,
  setTotalPrice,
}: {
  order: TOrder;
  setTotalPrice: (totalPrice: number) => void;
}): React.JSX.Element => {
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  const { ingredientsList, totalPrice } = useMemo(() => {
    let totalPrice = 0;
    const ingredientsMap = new Map<string, { ingredient: TIngredient; count: number }>();
    const ingredientsList: React.JSX.Element[] = [];

    order?.ingredients.forEach((ingredientId) => {
      const ingredient = ingredients.find((elem) => elem._id === ingredientId);

      if (!ingredient) return;

      if (ingredientsMap.has(ingredientId)) {
        const item = ingredientsMap.get(ingredientId);

        if (!item) return;

        totalPrice += ingredient.price;
        ingredientsMap.set(ingredientId, { ingredient, count: ++item.count });
      } else {
        totalPrice += ingredient.price;
        ingredientsMap.set(ingredientId, { ingredient, count: 1 });
      }
    });

    for (const item of ingredientsMap.values()) {
      const { ingredient, count } = item;

      ingredientsList.push(
        <li key={ingredient._id} className={styles.block}>
          <div className={styles.image}>
            <img src={ingredient.image_large} alt="ingredient" />
          </div>
          <p className={`${styles.name} text text_type_main-default`}>
            {ingredient.name}
          </p>
          <div
            className={`text text_type_main-default text text_type_digits-default ${styles.price}`}
          >
            {count} x {ingredient.price}
          </div>
        </li>
      );
    }

    return { ingredientsList, totalPrice };
  }, [order, ingredients]);

  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice]);

  return <ul className={styles.list}>{ingredientsList.map((item) => item)}</ul>;
};

export default IngredientsList;
