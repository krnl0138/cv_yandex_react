import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function AppHeader() {
    let location = useLocation();

    return (
        <header className={`${styles.header}
                      text text_type_main-small text_color_inactive 
                        pt-2 pb-2 pl-8 pr-8`}>

            <nav className={styles.nav}>

                <NavLink
                    exact to={{
                        pathname: '/' ,
                        state: {type: 'secondary'}
                    }}
                    activeClassName={styles.activeLink}
                    className={`${styles.nav_element} ${styles.push_left} pt-2 pb-2 pl-5 pr-5 ${styles.link}`}
                >
                    <BurgerIcon type="secondary" />
                    <p className={`${styles.app_header_button} ml-2`}>Конструктор</p>
                </NavLink>


                <div className={`${styles.nav_element} ${styles.push_left} pt-2 pb-2 pl-5`}>
                    <ListIcon type="secondary" />
                    <p className={`${styles.app_header_button} ml-2`}>Лента заказов</p>
                </div>
                <Link to={{ pathname: "/" }} className={styles.center}>
                    <Logo />
                </Link>
                <div className={`${styles.nav_element} ${styles.push_right} pt-2 pb-2 pl-5 pr-5`}>
                    <ProfileIcon type="secondary" />
                    <NavLink
                        to={{ pathname: '/profile' }}
                        activeClassName={styles.activeLink}
                        className={`text text_type_main-small text-color-inactive ml-2 ${styles.link}`}>
                        Личный кабинет
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}
