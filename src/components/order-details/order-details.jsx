import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function OrderDetails({ onClose, orderNum }) {

    return (
        <Modal onClose={onClose}>
            <div className={`${styles.card} pt-10 pb-10`}>
                <h3 className={`${styles.order} pt-3 text text_type_digits-large`}>{orderNum}</h3>
                <p className='text text_type_main-medium pt-1'>идентификатор заказа</p>
                <span className={`${styles.icon} mt-20 mb-20`}><CheckMarkIcon /></span>
                <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive pb-10 pt-2'>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
};

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    orderNum: PropTypes.number.isRequired
}