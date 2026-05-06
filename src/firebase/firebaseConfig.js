import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyALKMqoN6XuESJ6ksEBrWM8tXHgZXweYGU",
    authDomain: "social-neighborhood.firebaseapp.com",
    databaseURL: "https://social-neighborhood-default-rtdb.firebaseio.com",
    projectId: "social-neighborhood",
    storageBucket: "social-neighborhood.appspot.com",
    messagingSenderId: "977252670948",
    appId: "1:977252670948:web:5ddf6a6b0fc26ef2e0fbf1"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
export {db,storage}
