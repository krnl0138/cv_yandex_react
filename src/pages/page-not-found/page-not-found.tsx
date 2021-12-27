import React from 'react';
import styles from './page-not-found.module.css';

export default function PageNotFound(): JSX.Element {

    return (
        <p className={`text text_type_main-large ${styles.main}`}>
            404
        </p>
    )
}