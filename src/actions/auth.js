import Swal from 'sweetalert2'
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from './../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error', `User not found`, 'error');
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then( async({ user }) => {
        await updateProfile( user, { displayName: name });
        console.log(user);
        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        console.log(e);
        Swal.fire('Error', `User already registered`, 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid, 
    displayName
  }
});

export const startLogout = () => {
  return async(dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => ({
  type: types.logout
});