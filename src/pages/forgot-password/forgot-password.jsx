import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css';
import { useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/actions/authR';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);

    const [form, setForm] = useState({ email: '' });

    const onFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'PASSWORD_FORGOT' });
        dispatch(forgotPassword(form));
        history.replace({ pathname: '/reset-password' });
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
                <Input
                    type={'text'}
                    placeholder={'Укажите e-mail'}
                    onChange={onFormChange}
                    value={form.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <div className={styles.formChild}>
                    <Button
                        type="primary"
                        size="large"
                    >
                        Восстановить
                    </Button>
                </div>

            </form>

            <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to={{ pathname: '/login' }}>Войти</Link>
            </p>
        </div>
    )
}