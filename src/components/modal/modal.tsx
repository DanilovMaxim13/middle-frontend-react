import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

export type PropsModal = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

const Modal = ({ children, isOpen, onClose, title }: PropsModal): React.JSX.Element => {
  useEffect(() => {
    const handleESC = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleESC);

    return (): void => document.removeEventListener('keydown', handleESC);
  }, [onClose]);

  const handleBackdropClick = (e: React.BaseSyntheticEvent): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <div className={styles.modal_backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} p-10`}>
        <header className={styles.modal_header}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          <CloseIcon className={styles.modal_close} onClick={onClose} type="primary" />
        </header>
        <div className={`${styles.modal_content} pl-15 pr-15`}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
