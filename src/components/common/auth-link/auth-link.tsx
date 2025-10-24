import { Link } from 'react-router-dom';

import type React from 'react';

import styles from './auth-link.module.css';

export type PropsAuthLink = {
  link: string;
  title: string;
  to: string;
};

const AuthLink = ({ title, link, to }: PropsAuthLink): React.JSX.Element => {
  return (
    <p className="text text_type_main-default">
      <span className={styles.text}>{title}</span>{' '}
      <Link to={to} className={styles.link}>
        {link}
      </Link>
    </p>
  );
};

export default AuthLink;
