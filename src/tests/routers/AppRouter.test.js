import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth:{},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 'test', 
    },
    notes: []
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Pruebas en <AppRouter />', () => {

  test('debe de llamar el login si estoy autenticado', async() => {
    
    // let user;

    await act(async() => {

      const auth = getAuth();
      await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');
      // user = userCred.user;

      mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();

  });
});
