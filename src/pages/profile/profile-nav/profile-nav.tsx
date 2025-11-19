import { NavLink } from 'react-router-dom';

import { logout } from '@services/auth/actions.ts';
import { useDispatch } from '@services/store.ts';

import type { AppDispatch } from '@services/store.ts';

import styles from './profile-nav.module.css';

const ProfileNav = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = (): void => {
    void dispatch(logout());
  };

  return (
    <section className={styles.section}>
      <nav className={styles.nav}>
        <NavLink
          end
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : `${styles.link}`
          }
        >
          <p className="text text_type_main-medium ml-2 mt-2 mb-2">Профиль</p>
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : `${styles.link}`
          }
        >
          <p className="text text_type_main-medium ml-2 mt-2 mb-2">История заказов</p>
        </NavLink>
        <NavLink to="/" onClick={() => handleLogout()} className={styles.link}>
          <p className="text text_type_main-medium ml-2 mt-2 mb-2">Выход</p>
        </NavLink>
      </nav>
      <p className={'text text_type_main-default'}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  );
};

export default ProfileNav;
