import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from './../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router';

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

describe('Pruebas en <LoginScreen />', () => {
  
  beforeEach(() => {
    store = mockStore(initState);
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
  
});
