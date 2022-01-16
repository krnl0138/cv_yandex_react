import styles from './loader.module.css'

export default function Loader() {
  return (
    <div className={styles.main}>
      <div className={styles.loader}></div>
    </div>
  )
}