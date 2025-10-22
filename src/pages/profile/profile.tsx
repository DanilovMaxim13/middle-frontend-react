import { Outlet } from 'react-router-dom';

import ProfileNav from '@pages/profile/profile-nav/profile-nav.tsx';

import styles from './profile.module.css';

const Profile = (): React.JSX.Element => {
  return (
    <section className={styles.section}>
      <ProfileNav />
      <Outlet />
    </section>
  );
};

export default Profile;
