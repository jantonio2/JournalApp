import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

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
      console.log(doc);
    } catch (error) {
      console.log(error);
    }
  };
};