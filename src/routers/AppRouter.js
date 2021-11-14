import React, { useEffect, useState } from 'react';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from './../components/journal/JournalScreen';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if(checking) {
    return (
      <h1>Espere...</h1>
    );
  }
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute 
              path="/auth" 
              component={AuthRouter} 
              isAuthenticated={isLoggedIn}
            />
            <PrivateRoute 
              exact 
              path="/" 
              component={JournalScreen} 
              isAuthenticated={isLoggedIn}
            />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
