import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import AuthLink from '@components/common/auth-link/auth-link.tsx';
import { resetPassword } from '@services/auth/actions.ts';
import { getLoading } from '@services/auth/selectors.ts';

import type { AppDispatch } from '@services/store.ts';
import type { NavigateFunction } from 'react-router-dom';

import styles from './reset-password.module.css';

const ResetPasswordPage = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const loading = useSelector(getLoading);

  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (localStorage.getItem('resetPassword') !== 'true') {
      void navigate('/forgot-password');
    }
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(resetPassword(password, token, navigate));
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <h4 className="text text_type_main-medium">Восстановление пароля</h4>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
          placeholder={'Введите новый пароль'}
          icon={'ShowIcon'}
        />
        <Input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          name={'names.password'}
          placeholder={'Введите код из письма'}
        />
        <Button htmlType="submit" disabled={loading}>
          Сохранить
        </Button>
      </form>

      <div className={styles.links}>
        <AuthLink title="Вспомнили пароль?" link="Войти" to="/login" />
      </div>
    </section>
  );
};

export default ResetPasswordPage;
