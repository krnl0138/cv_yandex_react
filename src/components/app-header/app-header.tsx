import styles from './app-header.module.scss';
import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { AppHeaderMobile } from './app-header-mobile/app-header-mobile';
import { AppHeaderSmall } from './app-header-small/app-header-small';

export default function AppHeader(): JSX.Element {
  const isDesktopScreen = useMediaQuery({ minDeviceWidth: 1025 });
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 1024, minDeviceWidth: 801 });
  const isMobileScreen = useMediaQuery({ maxDeviceWidth: 800 });

  return (
    <header className={`${styles.header} text text_type_main-small text_color_inactive `}>
      <nav className={styles.nav}>
        {isMobileScreen && <AppHeaderMobile />}
        {isSmallScreen && <AppHeaderSmall />}
        {isDesktopScreen && (
          <>
            <NavLink
              exact
              to={{ pathname: '/' }}
              activeClassName={styles.activeLink}
              className={`${styles.nav_element} pt-2 pb-2 pl-5 pr-5 ${styles.link}`}
            >
              <BurgerIcon type="secondary" />
              <p className={`${styles.app_header_button} ml-2`}>Конструктор</p>
            </NavLink>

            <NavLink
              to={{ pathname: '/feed' }}
              activeClassName={styles.activeLink}
              className={` pt-2 pb-2 pl-5 pr-5 ${styles.nav_element} ${styles.link}`}
              data-cy="feed-page-link"
            >
              <ListIcon type="secondary" />
              <p className={`${styles.app_header_button} ml-2`}>Лента заказов</p>
            </NavLink>

            <span className={styles.center}>
              <Link to={{ pathname: '/' }}>
                <Logo />
              </Link>
            </span>

            <NavLink
              to={{ pathname: '/profile' }}
              activeClassName={styles.activeLink}
              className={` pt-2 pb-2 pl-5 pr-5 ${styles.nav_element} ${styles.nav_element_right} ${styles.link}`}
            >
              <ProfileIcon type="secondary" />
              <p className={`${styles.app_header_button} ml-2`}>Профиль</p>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
