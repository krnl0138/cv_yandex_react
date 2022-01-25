import styles from './app-header.module.scss';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { AppHeaderDesktop } from './app-header-desktop/app-header-desktop';
import { AppHeaderSmall } from './app-header-small/app-header-small';
import { AppHeaderMobile } from './app-header-mobile/app-header-mobile';
import { AppHeaderHamburger } from './F-app-header-hamburger/app-header-hamburger';
import { DESKTOP_SCREEN_SIZE, MOBILE_SCREEN_SIZE } from '../../utils/constants';

export default function AppHeader(): JSX.Element {
  const isDesktopScreen = useMediaQuery({ minDeviceWidth: DESKTOP_SCREEN_SIZE });
  const isSmallScreen = useMediaQuery({
    maxDeviceWidth: DESKTOP_SCREEN_SIZE - 1,
    minDeviceWidth: MOBILE_SCREEN_SIZE + 1,
  });
  const isMobileScreen = useMediaQuery({ maxDeviceWidth: MOBILE_SCREEN_SIZE });

  // {/* {isMobileScreen && <AppHeaderMobile />} */}
  return (
    <>
      {isMobileScreen && <AppHeaderHamburger />}
      {isSmallScreen && <AppHeaderSmall />}
      {isDesktopScreen && <AppHeaderDesktop />}
    </>
  );
}
