import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import Protected from '@components/protected-route/protected-route.tsx';
import ForgotPasswordPage from '@pages/forgot-password/forgot-password.tsx';
import LoginPage from '@pages/login/login.tsx';
import MainPage from '@pages/main/main.tsx';
import RegisterPage from '@pages/register/register.tsx';
import ResetPasswordPage from '@pages/reset-password/reset-password.tsx';
import { getIngredients } from '@services/burger-ingredients/actions.ts';

import type { AppDispatch } from '@services/store.ts';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(getIngredients());
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={
              <Protected onlyUnAuth>
                <LoginPage />
              </Protected>
            }
          />
          <Route
            path="/register"
            element={
              <Protected onlyUnAuth>
                <RegisterPage />
              </Protected>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Protected onlyUnAuth>
                <ForgotPasswordPage />
              </Protected>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Protected onlyUnAuth>
                <ResetPasswordPage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <div>/profile</div>
              </Protected>
            }
          />
          <Route path="/ingredients/:id" element={<div>/</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
