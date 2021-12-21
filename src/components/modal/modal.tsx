import ReactDOM from "react-dom";
import React, { ReactNode, useEffect } from 'react';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ children, onClose }: IModalProps) {
    const modalRoot = document.getElementById("react-modals") as HTMLElement;

    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { onClose() }
        }

        window.addEventListener('keydown', closeModal)
        return () => window.removeEventListener('keydown', closeModal)
    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={styles.modal}>
                <span onClick={onClose} className={styles.modalCloseIcon}>
                    <CloseIcon type="primary" />
                </span>
                {children}
            </div>
        </>, modalRoot
    );
}