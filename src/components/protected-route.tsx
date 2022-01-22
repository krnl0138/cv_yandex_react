import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from '../types/hooks';
import { getUserData } from '../services/actions/auth/user-data';
import Loader from './loader/loader';
import React from 'react';

interface IProtectedRoute extends RouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children, ...rest }: IProtectedRoute): JSX.Element | null {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const user = useSelector(store => store.user);

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
          user.username ? (children)
            : (
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