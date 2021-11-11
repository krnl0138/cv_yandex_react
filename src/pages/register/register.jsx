import styles from './register.module.css';
import { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../services/auth';

export default function Register() {
    const history = useHistory();
    let auth = useAuth();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const onChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        auth.register(form);
        history.replace({ pathname: '/' });
    }

    if (auth.user) {
        return (
            <Redirect to={{ pathname: '/' }} />
        )
    }

    return (
        <>
            <div className={styles.main}>

                <form onSubmit={onFormSubmit} className={styles.form}>
                    <p className="text text_type_main-large">
                        Регистрация
                    </p>

                    <div className={styles.formChild}>

                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            value={form.username}
                            name={'username'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className={styles.formChild}>
                        <Input
                            type={'text'}
                            placeholder={'E-mail'}
                            onChange={onChange}
                            value={form.email}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className={styles.formChild}>
                        <PasswordInput
                            onChange={onChange}
                            value={form.password}
                            name={'password'}
                        />
                    </div>

                    <div className={styles.formChild}>
                        <Button
                            type="primary"
                            size="large"
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>

                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to={{ pathname: '/login' }}>Войти</Link>
                </p>
            </div>
        </>
    )
}