import styles from './app-header-hamburger.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { clear } from 'console';

export const AppHeaderHamburger = (): JSX.Element => {
  const mainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isMenuClicked, setMenuClicked] = useState(false);
  const [isCheckboxClicked, setCheckboxClicked] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.currentTarget && !mainRef.current?.contains(e.currentTarget as Node)) {
        return;
      }
      console.log(mainRef.current, labelRef.current);
      console.log('click outside');
      setCheckboxClicked(false);
      console.log(isCheckboxClicked);
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const onClick = () => {
    setCheckboxClicked(!isCheckboxClicked);
  };

  return (
    <header className={styles.header}>
      <span className={styles.logo}>
        <Link to={{ pathname: '/' }}>
          <Logo />
        </Link>
      </span>

      <input
        className={styles.sideMenu}
        type="checkbox"
        checked={isCheckboxClicked}
        id="side-menu"
      />
      <label className={styles.hamb} htmlFor="side-menu" ref={labelRef} onClick={onClick}>
        <span className={styles.hambLine}></span>
      </label>

      <nav className={styles.nav} ref={mainRef}>
        <ul className={styles.menu} onClick={onClick}>
          <Link to={{ pathname: '/' }} className={`${styles.menu_element} ${styles.link}`}>
            <BurgerIcon type="secondary" />
            <p className={`text text_type_main-default pl-2`}>Конструктор</p>
          </Link>

          <Link
            to={{ pathname: '/feed' }}
            className={`${styles.menu_element} ${styles.link}`}
            data-cy="feed-page-link"
          >
            <ListIcon type="secondary" />
            <p className={`text text_type_main-default pl-2`}>Лента заказов</p>
          </Link>

          <Link to={{ pathname: '/profile' }} className={`${styles.menu_element} ${styles.link}`}>
            <ProfileIcon type="secondary" />
            <p className={`text text_type_main-default pl-2`}>Профиль</p>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
