import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
      uid: 'TESTING'
  },
  notes: {
      active: null
  }
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {
  test('debe de crear una nueva nota startNewNote', async() => {
    
  });
});