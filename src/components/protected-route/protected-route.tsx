import { useSelector } from 'react-redux';
// import { Preloader } from '@/components/preloader/preloader';
// import { useAuth } from '@/hooks';
import { Navigate, useLocation } from 'react-router-dom';

import { getUser } from '@services/auth/selectors.ts';

// import { routesConfig } from './routesConfig';

type TProps = {
  children: React.JSX.Element;
  onlyUnAuth?: boolean;
};

const Protected = ({ children, onlyUnAuth = false }: TProps): React.JSX.Element => {
  const user = useSelector(getUser);
  // const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   return <div>Загрузка</div>;
  // }

  console.log(onlyUnAuth, user);
  if (!user && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // if (user && onlyUnAuth) {
  //   const { from } = location.state ?? { from: { pathname: '/' } };
  //   return <Navigate to={from} />;
  // }

  return children;
};

export default Protected;
