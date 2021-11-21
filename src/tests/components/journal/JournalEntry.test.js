import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 10,
  date: 0,
  title: 'title',
  body: 'body',
  url: 'https://algunlugar.com/foto.png'
}

describe('Pruebas en <JournalEntry />', () => {

  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry {...note}/>
    </Provider>
  );

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('debe de activar la nota', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, {...note})
    );
  });
});
