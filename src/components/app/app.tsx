import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import AppRoutes from '@components/app-routes/app-routes.tsx';
import { getUser } from '@services/auth/actions.ts';
import { getIngredients } from '@services/burger-ingredients/actions.ts';

import type { AppDispatch } from '@services/store.ts';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(getIngredients());
    void dispatch(getUser());
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
