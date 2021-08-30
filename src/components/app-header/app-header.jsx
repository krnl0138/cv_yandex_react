import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {

    return (
        <header className={`${styles.header}
                      text text_type_main-small text_color_inactive 
                        pt-2 pb-2 pl-8 pr-8`}>
            <nav className={styles.nav}>
                <div className={`${styles.nav_element} ${styles.push_left} pt-2 pb-2 pl-5 pr-5`}>
                    <BurgerIcon type="secondary" />
                    <p className={`${styles.app_header_button} ml-2`}>Конструктор</p>
                </div>
                <div className={`${styles.nav_element} ${styles.push_left} pt-2 pb-2 pl-5`}>
                    <ListIcon type="secondary" />
                    <p className={`${styles.app_header_button} ml-2`}>Лента заказов</p>
                </div>
                <span className={styles.center}>
                    <Logo />
                </span>
                <div className={`${styles.nav_element} ${styles.push_right} pt-2 pb-2 pl-5 pr-5`}>
                    <ProfileIcon type="secondary" />
                    <p className={`${styles.app_header_button} ml-2`}>Личный кабинет</p>
                </div>
            </nav>
        </header>
    )
}
