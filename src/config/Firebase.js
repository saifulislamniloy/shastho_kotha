import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCRJeCa8VJbudZZ7NeSp0tu42AXBUfGtHM',
  authDomain: 'healthworkerblog.firebaseapp.com',
  databaseURL: 'https://healthworkerblog.firebaseio.com',
  projectId: 'healthworkerblog',
  storageBucket: 'healthworkerblog.appspot.com',
  messagingSenderId: '291473901767',
  appId: '1:291473901767:web:6eba528cea0ba9737c56e2'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export default firebase;
