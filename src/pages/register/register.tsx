import styles from './register.module.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from '../../types/hooks';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { register } from '../../services/actions/auth/register';
import React from 'react';

export default function Register(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    const formValue = e.currentTarget.value;
    const formName = e.currentTarget.name;
    setForm(prev => ({ ...prev, [formName]: formValue }));
  };

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(form));
    history.replace({ pathname: '/' });
  };

  if (user.username) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <>
      <div className={styles.main}>
        <p className="text text_type_main-large">Регистрация</p>

        <form onSubmit={onFormSubmit} className={styles.form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onFormChange}
            value={form.username}
            name={'username'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />

          <div className={styles.formChild}>
            <Input
              type={'text'}
              placeholder={'E-mail'}
              onChange={onFormChange}
              value={form.email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>

          <div className={styles.formChild}>
            <PasswordInput onChange={onFormChange} value={form.password} name={'password'} />
          </div>

          <div className={styles.formChild}>
            <Button type="primary" size="large">
              Зарегистрироваться
            </Button>
          </div>
        </form>

        <p className={`${styles.link} text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы? <Link to={{ pathname: '/login' }}>Войти</Link>
        </p>
      </div>
    </>
  );
}
