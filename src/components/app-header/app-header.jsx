import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeaderButton from './app-header-button/app-header-button';

export default function AppHeader() {

    return (
        <header className={`${styles.header}
                      text text_type_main-small text_color_inactive 
                        pt-2 pb-2 pl-8 pr-8`}>
            <nav className={styles.nav}>
                <div className={`${styles.nav_element} ${styles.push_left} pt-2 pb-2 pl-5 pr-5`}>
                    <BurgerIcon type="secondary" />
                    <AppHeaderButton text='Конструктор' />
                </div>
                <div className={`${styles.nav_element} ${styles.push_left} pt-2 pb-2 pl-5 pr-5`}>
                    <ListIcon type="secondary" />
                    <AppHeaderButton text='Лента заказов' />
                </div>
                <span className={styles.center}>
                    <Logo />
                </span>
                <div className={`${styles.nav_element} ${styles.push_right} pt-2 pb-2 pl-5 pr-5`}>
                    <ProfileIcon type="secondary" />
                    <AppHeaderButton text='Личный кабинет' />
                </div>
            </nav>
        </header>
    )
}
