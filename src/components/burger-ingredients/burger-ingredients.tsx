import { Preloader, Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import BurgerIngredientCard from '@components/burger-ingredients/burger-ingredients-card/burger-ingredients-card.tsx';
import { CATEGORY_LABELS } from '@components/constants/category-ingredients.ts';
import {
  getIngredientsError,
  getIngredientsLoading,
  getIngredientsSelector,
} from '@services/burger-ingredients/selectors.ts';

import type { TIngredient } from '@utils/types';
import type { RefObject } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);
  const loading: boolean = useSelector(getIngredientsLoading);
  const error: string | null = useSelector(getIngredientsError);

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

  const [currentTab, setCurrentTab] = useState('bun');

  const containerRef = useRef<HTMLDivElement>(null);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const refs: Record<string, RefObject<HTMLDivElement | null>> = {
    bun: bunRef,
    sauce: sauceRef,
    main: mainRef,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (): void => {
      if (!bunRef.current || !sauceRef.current || !mainRef.current) return;

      const containerTop = container.getBoundingClientRect().top;

      const bunDist = Math.abs(
        bunRef.current.getBoundingClientRect().top - containerTop
      );

      const sauceDist = Math.abs(
        sauceRef.current.getBoundingClientRect().top - containerTop
      );

      const mainDist = Math.abs(
        mainRef.current.getBoundingClientRect().top - containerTop
      );

      const minDist = Math.min(bunDist, sauceDist, mainDist);

      if (minDist === bunDist) setCurrentTab('bun');
      else if (minDist === sauceDist) setCurrentTab('sauce');
      else if (minDist === mainDist) setCurrentTab('main');
    };

    container.addEventListener('scroll', handleScroll);

    return (): void => container.removeEventListener('scroll', handleScroll);
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients_wrapper}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={currentTab === 'bun'}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === 'main'}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === 'sauce'}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      {loading && <Preloader />}

      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && (
        <div
          className={`${styles.burger_ingredients} custom-scroll mt-10 mb-6`}
          ref={containerRef}
        >
          {Object.entries(groupedIngredients).map(([type, ingredient]) => {
            return (
              <div key={type} ref={refs[type]}>
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
      )}
    </section>
  );
};
