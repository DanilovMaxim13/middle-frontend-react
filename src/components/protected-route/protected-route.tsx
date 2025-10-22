import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getIsAuthChecked, getUser } from '@services/auth/selectors.ts';

type TProps = {
  children: React.JSX.Element;
  onlyUnAuth?: boolean;
};

const Protected = ({ children, onlyUnAuth = false }: TProps): React.JSX.Element => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div>Загрузка</div>;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from as string} />;
  }

  return children;
};

export default Protected;
