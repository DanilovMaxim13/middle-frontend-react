import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '@services/auth/actions.ts';
import { getUser } from '@services/auth/selectors.ts';

import type { AppDispatch } from '@services/store.ts';
import type { TUser } from '@utils/types.ts';

import styles from './profile-info.module.css';

const ProfileInfo = (): React.JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const user: TUser | null = useSelector(getUser);

  const [name, setName] = useState<string>(user?.name ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [password, setPassword] = useState<string>('');
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (name !== user?.name) {
      setIsChanged(true);
      return;
    }

    if (email !== user?.email) {
      setIsChanged(true);
      return;
    }

    if (password !== '') {
      setIsChanged(true);
      return;
    }

    setIsChanged(false);
    return;
  }, [user, name, email, password]);

  useEffect(() => {
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPassword('');
  }, [user]);

  const handleResetForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPassword('');
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(setUser(name, email, password));
  };

  return (
    <form className={styles.form} onReset={handleResetForm} onSubmit={handleSubmitForm}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
        icon={'EditIcon'}
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        icon={'EditIcon'}
        type="email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        icon={'EditIcon'}
        type="password"
      />
      {isChanged && (
        <div className={styles.buttons}>
          <Button type="secondary" size="medium" htmlType={'reset'}>
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType={'submit'}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileInfo;
