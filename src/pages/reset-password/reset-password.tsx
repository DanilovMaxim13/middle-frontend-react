import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import AuthLink from '@components/common/auth-link/auth-link.tsx';
import { request } from '@components/constants/api.ts';
import { getLoading } from '@services/auth/selectors.ts';
import { useSelector } from '@services/store.ts';

import type { NavigateFunction } from 'react-router-dom';

import styles from './reset-password.module.css';

const ResetPasswordPage = (): React.JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const loading = useSelector(getLoading);

  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (localStorage.getItem('resetPassword') !== 'true') {
      void navigate('/forgot-password');
    }
  });

  const handleSubmitForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = await request('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token,
      }),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (data.success) {
      localStorage.removeItem('resetPassword');
      void navigate('/login');
    }
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={() => void handleSubmitForm}>
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
