import styles from './loader.module.scss'
import React from 'react';

export default function Loader(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.loader}></div>
    </div>
  )
}