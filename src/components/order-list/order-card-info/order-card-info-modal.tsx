import { useNavigate } from 'react-router';

import Modal from '@components/modal/modal.tsx';
import OrderCardInfo from '@components/order-list/order-card-info/order-card-info.tsx';

const OrderCardInfoModal = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Modal isOpen onClose={() => void navigate(-1)}>
      <OrderCardInfo />
    </Modal>
  );
};

export default OrderCardInfoModal;
