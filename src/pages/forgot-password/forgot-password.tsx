import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import AuthLink from '@components/common/auth-link/auth-link.tsx';
import { request } from '@components/constants/api.ts';
import { getLoading } from '@services/auth/selectors.ts';
import { useSelector } from '@services/store.ts';

import type { NavigateFunction } from 'react-router-dom';

import styles from './forgot-password.module.css';

const ForgotPasswordPage = (): React.JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const loading = useSelector(getLoading);

  const [email, setEmail] = useState<string>('');

  const handleSubmitForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = await request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (data.success) {
      localStorage.setItem('resetPassword', 'true');
      void navigate('/reset-password');
    }
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={() => void handleSubmitForm}>
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
