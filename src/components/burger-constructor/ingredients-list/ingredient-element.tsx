import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { setIngredients } from '@services/burger-constructor/actions.ts';
import { getIngredients } from '@services/burger-constructor/selectors.ts';

import type { AppDispatch } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

import styles from '../burger-constructor.module.css';

export const IngredientElement = ({
  index,
  ingredient,
}: {
  index: number;
  ingredient: TIngredient;
}): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const ref = useRef<HTMLDivElement>(null);

  const handleDeleteIngredient = useCallback(
    (index: number) => {
      const newIngredients = ingredients.slice();
      newIngredients.splice(index, 1);

      dispatch(setIngredients(newIngredients));
    },
    [ingredients]
  );

  const handleMoveIngredient = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newIngredients = ingredients.slice();
      const [moved] = newIngredients.splice(fromIndex, 1);
      newIngredients.splice(toIndex, 0, moved);

      dispatch(setIngredients(newIngredients));
    },
    [ingredients]
  );

  const [, dragRef] = useDrag({
    type: 'ingredients-list',
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: 'ingredients-list',
    hover: (dragged: { index: number }) => {
      if (dragged.index === index) return;
      handleMoveIngredient(dragged.index, index);
      dragged.index = index;
    },
  });

  dragRef(dropRef(ref));

  return (
    <div className={styles.ingredient} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        handleClose={() => handleDeleteIngredient(index)}
      />
    </div>
  );
};
