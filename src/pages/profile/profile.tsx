import styles from './profile.module.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUserData, logout } from '../../services/actions/auth';
import { RootState } from '../../services/reducers';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((store: RootState) => store.user);
    const [form, setForm] = useState({ username: user.username, email: user.email, password: '' });
    const mainRef = useRef<HTMLDivElement>(null);
    // const mainRef = useRef<HTMLDivElement>() as any;
    const [isFormClicked, setFormClicked] = useState(false);

    const resetProfileFormValue = () => {
        setForm(prev => ({ ...prev, username: user.username, email: user.email, password: '' }));
    }

    const onClickLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    // handle form clicks
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.currentTarget && mainRef.current?.contains(e.currentTarget as Node)) {
                return;
            }
            setFormClicked(false);
        };

        document.addEventListener('mousedown', handleClick);
        return () => { document.removeEventListener('mousedown', handleClick) }
    }, []);

    const onClick = (e: React.MouseEvent) => {
        setFormClicked(true);
    };

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const formValue = e.currentTarget.value;
        const formName = e.currentTarget.name;
        setForm(prev => ({ ...prev, [formName]: formValue }))
    }

    const onSubmit = (e: React.SyntheticEvent & any) => { // ? how to add submitter field to the SyntheticEvent type 
        e.preventDefault();
        if (e.nativeEvent.submitter.outerText === 'Отмена') {
            resetProfileFormValue();
        }
        if (e.nativeEvent.submitter.outerText === 'Сохранить') {
            dispatch(patchUserData(form));
        }
    }

    return (
        <div className={styles.main} ref={mainRef}>
            <nav className={styles.nav}>
                <NavLink
                    exact to={{ pathname: '/profile' }}
                    activeClassName={styles.activeLink}
                    className={`text text_type_main-large text-color-inactive ${styles.navChild}`}>
                    Профиль
                </NavLink>

                <NavLink
                    exact to={{ pathname: '/profile/orders' }}
                    activeClassName={styles.activeLink}
                    className={`text text_type_main-large text-color-inactive ${styles.navChild}`}>
                    История заказов
                </NavLink>

                <Link
                    onClick={onClickLogout}
                    to={{ pathname: '/' }}
                    className={`text text_type_main-large text-color-inactive ${styles.navChild}`}>
                    Выход
                </Link>

                <p className={`text text_type_main-small text_color_inactive ${styles.navParagraph}`}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>

            <form onSubmit={onSubmit} onClick={onClick} className={styles.form}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={form.username}
                    name={'username'}
                    icon={'EditIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <div className={styles.formChild}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        icon={'EditIcon'}
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


                {isFormClicked && (
                    <div className={styles.formChild}>
                        <Button type="secondary" size="medium">
                            Отмена
                        </Button>

                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                )}

            </form>
        </div>

    )
}