import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../services/actions/authR';

export function ProtectedRoute({ children, ...rest }) {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const user = useSelector(store => store.user);
  console.log(user)

  // const init = async () => {
  //   getUserData();
  //   setUserLoaded(true);
  // };

  useEffect(() => {
    getUserData();
    setUserLoaded(true);
  }, [getUserData]);

  if (!isUserLoaded) {
    return null;
  }

  return (
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
    />
  );
}