import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { NoteScreen } from './../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth:{
    uid: 'TESTING',
    name: 'Antonio'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 'test',
      title: 'Hola test',
      body: 'testing',
      date: 0
    },
    notes: []
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <NoteScreen />', () => {

  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de disparar el active note', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola de nuevo testing'
      }
    });

    expect(activeNote).toHaveBeenLastCalledWith(
      'test',
      {
        body: 'testing',
        title: 'Hola de nuevo testing',
        id: 'test',
        date: 0
      }
    );
  });
  
});
