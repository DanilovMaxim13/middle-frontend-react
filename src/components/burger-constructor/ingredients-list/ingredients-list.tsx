import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import { IngredientElement } from '@components/burger-constructor/ingredients-list/ingredient-element.tsx';
import { getIngredients } from '@services/burger-constructor/selectors.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from '../burger-constructor.module.css';

export const IngredientsList = (): React.JSX.Element => {
  const ingredients: TIngredient[] = useSelector(getIngredients);

  if (ingredients.length === 0) {
    return (
      <ConstructorElement
        extraClass={`${styles.empty_element} ml-8 mr-4`}
        isLocked
        price={0}
        text={`Ингредиенты отсутствуют! Добавьте из меню!`}
        thumbnail="Empty image"
      />
    );
  }

  return (
    <div className={`${styles.ingredients_list} custom-scroll`}>
      {ingredients.map((ingredient: TIngredient, index: number) => (
        <IngredientElement key={ingredient.uuid} ingredient={ingredient} index={index} />
      ))}
    </div>
  );
};
