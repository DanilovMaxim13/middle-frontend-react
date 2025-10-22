import { useNavigate } from 'react-router';

import DetailsIngredient from '@components/burger-ingredients/burger-ingredients-card/details-ingredient/details-ingredient.tsx';
import Modal from '@components/modal/modal.tsx';

const BurgerIngredientModal = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Modal isOpen onClose={() => void navigate(-1)} title="Детали ингредиента">
      <DetailsIngredient />
    </Modal>
  );
};

export default BurgerIngredientModal;
