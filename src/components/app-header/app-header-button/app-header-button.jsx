import React from "react";
import styles from './app-header-button.module.css';

export default function AppHeaderButton({text}) {
    return (
        <div className={`${styles.app_header_button} ml-2`}>
            <p>{text}</p>
        </div>
    )
}
