import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';
import { demoAuth } from './../fixtures/demoAuth';

describe('Pruebas en authReducer', () => {
  test('debe de retornar el valor por defecto', () => {
    expect(demoAuth).toEqual(authReducer(demoAuth, {type: 'addd'}));
  });
  
  test('debe de retornar un objeto con los datos de logueo', () => {
    expect({uid: demoAuth.uid, name: demoAuth.displayName}).toEqual(authReducer({}, {type: types.login, payload: demoAuth}));
  });
  
  test('debe de retornar un objeto vacío - logout', () => {
    expect({}).toEqual(authReducer({}, {type: types.logout, payload: demoAuth}));
  });
  
});
