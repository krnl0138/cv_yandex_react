import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css';
import { useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../services/auth';
import { PASSWORD_FORGOT } from '../../services/actions/forgot-password';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const history = useHistory();
    let auth = useAuth();

    const [form, setForm] = useState({ email: '' });

    const onFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: PASSWORD_FORGOT })
        await auth.forgotPassword(form);
        history.replace({ pathname: '/reset-password' });
    }

    if (auth.user) {
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