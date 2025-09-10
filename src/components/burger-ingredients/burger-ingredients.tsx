import { Tab } from '@krgaa/react-developer-burger-ui-components';

import BurgerIngredientCard from '@components/burger-ingredients/burger-ingredients-card/burger-ingredients-card.tsx';
import { CATEGORY_LABELS } from '@components/constants/category-ingredients.ts';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const groupedIngredients: Record<string, TIngredient[]> = ingredients.reduce(
    (acc: Record<string, TIngredient[]>, item: TIngredient) => {
      const { type } = item;

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(item);
      return acc;
    },
    {}
  );

  return (
    <section className={styles.burger_ingredients_wrapper}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <div className={`${styles.burger_ingredients} custom-scroll mt-10 mb-6`}>
        {Object.entries(groupedIngredients).map(([type, ingredient]) => {
          return (
            <div key={type}>
              <h4 className="text text_type_main-medium">{CATEGORY_LABELS[type]}</h4>
              <div className={`${styles.category} pl-4 pr-4`}>
                {ingredient.map((item) => {
                  return <BurgerIngredientCard key={item._id} ingredient={item} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
