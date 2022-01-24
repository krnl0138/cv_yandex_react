import styles from './app-header-mobile.module.scss';
import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

export const AppHeaderMobile = (): JSX.Element => {
  return (
    <>
      <NavLink
        exact
        to={{ pathname: '/' }}
        activeClassName={styles.activeLink}
        className={`${styles.nav_element} pt-2 pb-2 pl-5 pr-5 ${styles.link}`}
      >
        <BurgerIcon type="secondary" />
      </NavLink>

      <NavLink
        to={{ pathname: '/feed' }}
        activeClassName={styles.activeLink}
        className={` pt-2 pb-2 pl-5 pr-5 ${styles.nav_element} ${styles.link}`}
        data-cy="feed-page-link"
      >
        <ListIcon type="secondary" />
      </NavLink>

      <NavLink
        to={{ pathname: '/profile' }}
        activeClassName={styles.activeLink}
        className={` pt-2 pb-2 pl-5 pr-5 ${styles.nav_element} ${styles.link}`}
      >
        <ProfileIcon type="secondary" />
      </NavLink>

      <span className={styles.nav_element_right}>
        <Link to={{ pathname: '/' }}>
          <Logo />
        </Link>
      </span>
    </>
  );
};
