import styles from './app-header.module.scss';
import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { SMALL_SCREEN_SIZE, MOBILE_SCREEN_SIZE } from '../../utils/constants';
import { useMediaQuery } from 'react-responsive';
import { AppHeaderHamburger } from './app-header-hamburger/app-header-hamburger';
import { CustomLink } from './app-header-custom-link/app-header-custom-link';

export default function AppHeader(): JSX.Element {
  const isMobileScreen = useMediaQuery({ maxDeviceWidth: MOBILE_SCREEN_SIZE });
  const isSmallScreen = useMediaQuery({
    maxDeviceWidth: SMALL_SCREEN_SIZE - 1,
    minDeviceWidth: MOBILE_SCREEN_SIZE + 1,
  });
  const isDesktopScreen = useMediaQuery({ minDeviceWidth: SMALL_SCREEN_SIZE });

  return (
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

        {isMobileScreen && <AppHeaderHamburger />}
      </nav>
    </header>
  );
}
