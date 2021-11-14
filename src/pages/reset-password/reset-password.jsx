import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PASSWORD_FORGOT_RESTORE } from '../../services/actions/forgot-password';
import { resetPassword } from '../../services/actions/authR';

export default function ResetPassword() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user());

    const [form, setForm] = useState({ password: '', token: '' });

    const onFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: PASSWORD_FORGOT_RESTORE });
        dispatch(resetPassword());
    }

    if (user.username) {
        return (
            <Redirect to={{ pathname: '/' }} />
        )
    }

    return (
        <div className={styles.main}>

            <p className="text text_type_main-large">
                Восстановление пароля
            </p>

            <form onSubmit={onFormSubmit} className={styles.form}>
                <PasswordInput
                    onChange={onFormChange}
                    value={form.password}
                    name={'password'}
                />

                <div className={styles.formChild}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onFormChange}
                        value={form.token}
                        name={'token'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={styles.formChild}>
                    <Button type="primary" size="large">
                        Сохранить
                    </Button>
                </div>

            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to={{ pathname: '/login' }}>Войти</Link>
            </p>

        </div>
    )
}