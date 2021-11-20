 /**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { disableNetwork } from 'firebase/firestore';
import { login, logout, startLoginWithEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {

  beforeEach(() => {
    store = mockStore(initState);
  });

  afterAll(() => {disableNetwork(db)})

  test('login debe de crear la accion respectiva', () => {
    const uid = '123456';
    const displayName = 'Antonio';

    const res = login(uid, displayName);

    expect(res.type).toBe(types.login);
    expect(res.payload.uid).toBe(uid);
    expect(res.payload.displayName).toBe(displayName);
  });

  test('logout debe de crear la accion respectiva', () => {
    const uid = '123456';
    const displayName = 'Antonio';

    login(uid, displayName);
    const resLog = logout();

    expect(resLog.type).toBe(types.logout);
  });

  test('debe de realizar el startLogout', async() => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    });
  });

  test('debe de realizar el startLoginWithEmailPassword', async() => {
    await store.dispatch(startLoginWithEmailPassword('test@testing.com', '123456'));

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: 'NAwZ8b5uzxejgzxGNYYZgymPHis1',
        displayName: null
      }
    });
  });
  
  
});
