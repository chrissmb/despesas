import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBU1sBxOZVM6T94T-z1cEP9PTJmRiujqy4',
  authDomain: 'despesas-cca1b.firebaseapp.com',
  databaseURL: 'https://despesas-cca1b.firebaseio.com',
  projectId: 'despesas-cca1b',
  storageBucket: 'despesas-cca1b.appspot.com',
  messagingSenderId: '401688415262',
};
if (firebase.apps.length) {
  firebase.app();
} else {
  firebase.initializeApp(config);
}

export const db = firebase.database();
export const auth = firebase.auth();
export const emailAuthProvider = firebase.auth.EmailAuthProvider;

const prov = new firebase.auth.GoogleAuthProvider();
prov.languageCode = 'pt';
export const provider = prov;

