import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';

export const startNewNote = () => {
  return async(dispatch, getState) => {
    const {uid} = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    try {
      const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
      dispatch(activeNote(doc.id, newNote));
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});