import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { baseUrl } from '@components/constants/api.ts';

import type { TIngredient, TResponceIngredient } from '@utils/types.ts';
import type React from 'react';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);

  useEffect(() => {
    const getIngredients = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const res = await fetch(`${baseUrl}/api/ingredients`);

        if (!res.ok) {
          new Error('Ошибка сервера!');
        }

        const { data } = (await res.json()) as TResponceIngredient;
        setIngredients(data);
        setIsLoading(false);
      } catch (e) {
        const error = e as Error;
        new Error(`Неизвестная ошибка: ${error.message}`);
      }
    };

    void getIngredients();
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};

export default App;
