import styles from './modal-overlay.module.css'
import React from 'react';

interface IModalOverlay {
    onClose: () => void
}

export default function ModalOverlay({ onClose }: IModalOverlay): JSX.Element {
    return (
        <div className={styles.modalOverlay} onClick={onClose}></div>
    )
}