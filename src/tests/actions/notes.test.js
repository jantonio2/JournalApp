 /**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { disableNetwork } from 'firebase/firestore';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING'
  }
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {
  
  beforeEach(() => {
    store = mockStore(initState);
  });
  
  // Para no tener el problema del worker
  afterAll(() => {disableNetwork(db)})

  test('debe de crear una nueva nota startNewNote', async() => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    const docId = actions[0].payload.id;
    const noteRef = doc(db, `TESTING/journal/notes/${docId}`); 
    await deleteDoc(noteRef);
  });

  test('startLoadingNotes debe cargar las notas', async() => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    }

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote debe de actualizar la nota', async() => {
    const note = {
      id: 'Mv9JAvEnAdFMAD7vf3OW',
      title: 'titulo',
      body: 'body'
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    
    expect(actions[0].type).toBe(types.notesUpdated);

    const getDocumentRef = await getDoc(doc(db, "TESTING", "journal", "notes", `${note.id}`));

    expect(getDocumentRef.data().title).toBe(note.title);
  });
  
  
});