import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import AuthLink from '@components/common/auth-link/auth-link.tsx';
import { forgotPassword } from '@services/auth/actions.ts';
import { getLoading } from '@services/auth/selectors.ts';

import type { AppDispatch } from '@services/store.ts';
import type { NavigateFunction } from 'react-router-dom';

import styles from './forgot-password.module.css';

const ForgotPasswordPage = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const loading = useSelector(getLoading);

  const [email, setEmail] = useState<string>('');

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(forgotPassword(email, navigate));
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <h4 className="text text_type_main-medium">Восстановление пароля</h4>
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Укажите e-mail"
        />
        <Button htmlType="submit" disabled={loading}>
          Восстановить
        </Button>
      </form>

      <div className={styles.links}>
        <AuthLink title="Вспомнили пароль?" link="Войти" to="/login" />
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
