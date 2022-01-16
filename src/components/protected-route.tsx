import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from '../types/hooks';
import { getUserData } from '../services/actions/auth/user-data';
import Loader from './loader/loader';
import { RootState } from '../services/reducers';

interface IProtectedRoute extends RouteProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children, ...rest }: IProtectedRoute) {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const user = useSelector((store:RootState) => store.user);

  const init = useCallback(async () => {
    await dispatch(getUserData())
    setUserLoaded(true)
  }, [dispatch])

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    return null
  }

  return (
    isUserLoaded ? (
      <Route
        {...rest}
        render={({ location }) =>
          user.username ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />) : (<Loader />)
  );
}