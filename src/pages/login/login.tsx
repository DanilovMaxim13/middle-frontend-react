import { Button, EmailInput, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthLink from '@components/common/auth-link/auth-link.tsx';
import { login } from '@services/auth/actions.ts';
import { getLoading } from '@services/auth/selectors.ts';

import type { AppDispatch } from '@services/store.ts';

import styles from './login.module.css';

const LoginPage = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(getLoading);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(login(email, password));
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <h4 className="text text_type_main-medium">Вход</h4>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          value={email}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
          placeholder={'Пароль'}
          icon={'ShowIcon'}
        />
        <Button htmlType="submit" disabled={loading}>
          Войти
        </Button>
      </form>

      <div className={styles.links}>
        <AuthLink
          title="Вы — новый пользователь?"
          link="Зарегистрироваться"
          to="/register"
        />
        <AuthLink
          title="Забыли пароль?"
          link="Восстановить пароль"
          to="/forgot-password"
        />
      </div>
    </section>
  );
};

export default LoginPage;
