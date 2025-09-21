import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import Done from 'public/done.svg';
import { useSelector } from 'react-redux';

import Modal from '@components/modal/modal.tsx';
import {
  getOrder,
  getOrderError,
  getOrderLoading,
} from '@services/order-registration/selectors.ts';

import type { PropsModal } from '@components/modal/modal.tsx';
import type React from 'react';

import styles from './order-registration-modal.module.css';

const OrderRegistrationModal = ({ onClose, isOpen }: PropsModal): React.JSX.Element => {
  const order = useSelector(getOrder);
  const loading = useSelector(getOrderLoading);
  const error = useSelector(getOrderError);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {loading && (
        <div className={styles.info}>
          <Preloader />
        </div>
      )}

      {error && <div className={styles.info}>{error}</div>}

      {!loading && (
        <div className={styles.modal}>
          <h4 className="text text_type_digits-large">{order?.order.number}</h4>
          <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
          <img src={Done} alt="done" className="mt-15" />
          <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
          <p className={`${styles.description} text text_type_main-default mt-2 mb-20`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </Modal>
  );
};

export default OrderRegistrationModal;
