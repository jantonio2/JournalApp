import { login, logout } from '../../actions/auth';
import { types } from '../../types/types';

describe('Pruebas con las acciones de Auth', () => {
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
});
