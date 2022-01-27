import styles from './app-header.module.scss';
import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { AppHeaderHamburger } from './app-header-hamburger/app-header-hamburger';
import { CustomLink } from './app-header-custom-link/app-header-custom-link';
import { getBreakpoints } from '../../utils/helpers';

export default function AppHeader(): JSX.Element {
  const { isDesktopScreen, isMobileScreen, isSmallScreen } = getBreakpoints();
  return (
    <>
      {isMobileScreen && <AppHeaderHamburger />}
      <header className={`${styles.header} text text_type_main-small text_color_inactive `}>
        <nav className={styles.nav}>
          {isDesktopScreen && (
            <>
              <CustomLink url="/" icon="burger" text="Конструктор" right={false} />
              <CustomLink url="/feed" icon="list" text="Лента заказов" right={false} />

              <Link to={{ pathname: '/' }} className={styles.logo}>
                <Logo />
              </Link>

              <CustomLink url="/profile" icon="profile" text="Профиль" right={true} />
            </>
          )}

          {isSmallScreen && (
            <>
              <CustomLink url="/" icon="burger" text="" right={false} />
              <CustomLink url="/feed" icon="list" text="" right={false} />
              <CustomLink url="/profile" icon="profile" text="" right={false} />
              <Link to={{ pathname: '/' }} className={styles.pushRight}>
                <Logo />
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
