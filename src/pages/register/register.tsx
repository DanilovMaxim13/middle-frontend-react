import { Button, EmailInput, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import AuthLink from '@components/common/auth-link/auth-link.tsx';
import { register } from '@services/auth/actions.ts';
import { getLoading } from '@services/auth/selectors.ts';
import { useDispatch, useSelector } from '@services/store.ts';

import type { AppDispatch } from '@services/store.ts';

import styles from './register.module.css';

const RegisterPage = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(getLoading);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(register(name, email, password));
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <h4 className="text text_type_main-medium">Регистрация</h4>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder={'Имя'}
          value={name}
        />
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
          Зарегистрироваться
        </Button>
      </form>

      <div className={styles.links}>
        <AuthLink title="Уже зарегистрированы?" link="Войти" to="/login" />
      </div>
    </section>
  );
};

export default RegisterPage;
