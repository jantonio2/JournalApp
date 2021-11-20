import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from './../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router';
import { startGoogleLogin, startLoginWithEmailPassword } from './../../../actions/auth';

jest.mock('./../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginWithEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth:{},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <LoginScreen />', () => {
  
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );

  test('debe hacer match con el snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de disparar la accion de startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();
  });
  
  test('debe de dispara el startLogin con los respectivos argumentos', () => {
    wrapper.find('form').simulate('submit', {preventDefault(){}});
  
    expect(startLoginWithEmailPassword).toHaveBeenCalledWith('antonio@gmail.com',123456);
  });
});
