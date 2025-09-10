import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './price.module.css';

type size = 'sm' | 'md' | 'lg';

type PropsPrice = {
  price: number;
  size: size;
};

const ClassSize = {
  sm: 'text_type_digits-default',
  md: 'text_type_digits-medium',
  lg: 'text_type_digits-large',
};

const Price = ({ price, size = 'md' }: PropsPrice): React.JSX.Element => {
  return (
    <span className={styles.price_area}>
      <span className={`text ${ClassSize[size]}`}>{price}</span>
      <CurrencyIcon type="primary" className={styles[size]} />
    </span>
  );
};

export default Price;
