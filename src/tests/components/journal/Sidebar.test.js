import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from './../../../actions/auth';
import { startNewNote } from './../../../actions/notes';

jest.mock('./../../../actions/auth', () => ({
  startLogout: jest.fn()
}));

jest.mock('./../../../actions/notes', () => ({
  startNewNote: jest.fn()
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

describe('Pruebas en <Sidebar />', () => {
  
  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar startLogout', () => {
    wrapper.find('.btn').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();
  });
  
  test('debe de llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').simulate('click');

    expect(startNewNote).toHaveBeenCalled();
  });
});
