import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYaPVpHHyDYlMKBqU07E_MK55ZPcbSPTc",
  authDomain: "journal-app-d8013.firebaseapp.com",
  projectId: "journal-app-d8013",
  storageBucket: "journal-app-d8013.appspot.com",
  messagingSenderId: "377969019017",
  appId: "1:377969019017:web:169ea0dbf46c0770961e58"
};


initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider
}