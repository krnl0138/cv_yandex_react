import React from 'react';
import styles from './app-header-custom-link.module.scss';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

interface IMyComponent {
  icon: string;
}

interface ICustomLink {
  url: string;
  icon: string;
  text: string;
  right: boolean;
}

const IconHandler = ({ icon }: IMyComponent) => {
  const icons = {
    burger: BurgerIcon,
    list: ListIcon,
    profile: ProfileIcon,
  } as any;
  const Icon = icons[icon];
  return <Icon type="secondary" />;
};

export const CustomLink = ({ url, icon, text, right }: ICustomLink) => {
  return (
    <NavLink
      exact
      to={{ pathname: url }}
      activeClassName={styles.activeLink}
      className={` pt-2 pb-2 pl-5 pr-5 ${styles.nav_element} ${styles.link} ${
        right ? styles.pushRight : ''
      }`}
    >
      <IconHandler icon={icon} />
      <p className={`ml-2`}>{text}</p>
    </NavLink>
  );
};
