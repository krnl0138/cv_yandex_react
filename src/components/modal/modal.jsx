import ReactDOM from "react-dom";
import {useEffect} from 'react';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal({ children, onClose}) {
    const modalRoot = document.getElementById("react-modals");

     useEffect(() => {
        const closeModal = (e) => {
          if (e.keyCode === 27) { onClose() }
        }
        window.addEventListener('keydown', closeModal)

      return () => window.removeEventListener('keydown', closeModal)
    },[])

    return ReactDOM.createPortal(
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={styles.modal}>
                    <span onClick={onClose} className={styles.modalCloseIcon}>
                        <CloseIcon type="primary" />
                    </span>
                    {children}
                </div>
            </>, modalRoot
        );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};