import styles from './modal-overlay.module.css'

interface IModalOverlay {
    onClose: () => void
}

export default function ModalOverlay({ onClose }: IModalOverlay) {
    return (
        <div className={styles.modalOverlay} onClick={onClose}></div>
    )
}