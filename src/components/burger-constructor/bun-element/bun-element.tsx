import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import { getBun } from '@services/burger-constructor/selectors.ts';
import { useSelector } from '@services/store.ts';

import styles from '../burger-constructor.module.css';

type BunElementProps = {
  type: 'top' | 'bottom';
};

export const BunElement = ({ type }: BunElementProps): React.JSX.Element => {
  const bun = useSelector(getBun);

  if (!bun) {
    return (
      <ConstructorElement
        extraClass={`${styles.empty_element} ml-8 mr-4`}
        isLocked
        price={0}
        text={`Булочка отсутствует! Добавьте из меню!`}
        thumbnail="Empty image"
        type={type}
      />
    );
  }

  return (
    <ConstructorElement
      extraClass={`${styles.constructor_element} ml-8 mr-4`}
      isLocked
      price={bun.price}
      text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
      thumbnail={bun.image}
      type={type}
    />
  );
};
