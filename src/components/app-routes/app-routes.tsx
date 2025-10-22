import { Routes, Route, useLocation } from 'react-router-dom';

import BurgerIngredientModal from '@components/burger-ingredients/burger-ingredients-card/burger-ingredients-modal/burger-ingredients-modal.tsx';
import DetailsIngredient from '@components/burger-ingredients/burger-ingredients-card/details-ingredient/details-ingredient.tsx';
import Protected from '@components/protected-route/protected-route.tsx';
import ForgotPasswordPage from '@pages/forgot-password/forgot-password.tsx';
import LoginPage from '@pages/login/login.tsx';
import MainPage from '@pages/main/main.tsx';
import ProfileInfo from '@pages/profile/profile-info/profile-info.tsx';
import Profile from '@pages/profile/profile.tsx';
import RegisterPage from '@pages/register/register.tsx';
import ResetPasswordPage from '@pages/reset-password/reset-password.tsx';

const AppRoutes = (): React.JSX.Element => {
  const location = useLocation();
  const state = location.state as { backgroundLocation: Location };

  return (
    <>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<BurgerIngredientModal />} />
        </Routes>
      )}

      <Routes location={state?.backgroundLocation ?? location}>
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
              <Profile />
            </Protected>
          }
        >
          <Route index element={<ProfileInfo />} />
          <Route path="orders" element={<div>В следующем спринте</div>} />
          <Route path="orders/:id" element={<div>В следующем спринте</div>} />
        </Route>
        <Route path="/ingredients/:id" element={<DetailsIngredient />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
