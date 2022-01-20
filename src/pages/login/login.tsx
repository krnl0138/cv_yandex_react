import styles from './login.module.scss';
import { Button, Input, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from '../../types/hooks';
import { login } from '../../services/actions/auth/login';

export default function Login(): JSX.Element {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
        const formValue = e.currentTarget.value;
        const formName = e.currentTarget.name;
        setForm(prev => ({...prev, [formName]: formValue }))
    };

    const onFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(form));
        history.replace({ pathname: '/' });
    }

    if (user.username) {
        return (
            <Redirect to={{ pathname: '/' }} />
        )
    }

    return (
        <div className={styles.main}>

            <p className="text text_type_main-large">
                Вход
            </p>


            <form onSubmit={onFormSubmit} className={styles.form}>
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

                <div className={styles.formChild}>
                    <PasswordInput
                        onChange={onFormChange}
                        value={form.password}
                        name={'password'}
                    />

                </div>

                <div className={styles.formChild}>
                    <Button
                        type="primary"
                        size="large"
                    >
                        Войти
                    </Button>
                </div>

            </form>

            <p className={`${styles.link} text text_type_main-default text_color_inactive`}>
                Вы — новый пользователь? <Link to={{ pathname: '/register' }}>Зарегистрироваться</Link>
            </p>

            <p className={`${styles.link} text text_type_main-default text_color_inactive`}>
                Забыли пароль? <Link to={{ pathname: '/forgot-password' }}>Восстановить пароль</Link>
            </p>
        </div>
    )
}