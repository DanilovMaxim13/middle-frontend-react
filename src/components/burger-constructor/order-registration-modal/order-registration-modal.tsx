import Done from 'public/done.svg';

import Modal from '@components/modal/modal.tsx';

import type { PropsModal } from '@components/modal/modal.tsx';
import type React from 'react';

import styles from './order-registration-modal.module.css';

type PropsOrderDetails = {
  number: string;
} & PropsModal;

const OrderRegistrationModal = ({
  onClose,
  number,
  isOpen,
}: PropsOrderDetails): React.JSX.Element => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className={styles.modal}>
        <h4 className="text text_type_digits-large">{number ? number : '034536'}</h4>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <img src={Done} alt="done" className="mt-15" />
        <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
        <p className={`${styles.description} text text_type_main-default mt-2 mb-20`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};

export default OrderRegistrationModal;
