import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyA2jmtefwSZq3Bqqs-O8ZUuC--qL88YUEo",
    authDomain: "buggy-d8acd.firebaseapp.com",
    databaseURL: "https://buggy-d8acd.firebaseio.com",
    projectId: "buggy-d8acd",
    storageBucket: "buggy-d8acd.appspot.com",
    messagingSenderId: "629413586616"
};
var fire = firebase.initializeApp(config);
export default fire;