const Rebase = require('re-base');
const firebase = require('firebase');

const app = firebase.initializeApp({      
	apiKey: "AIzaSyA2jmtefwSZq3Bqqs-O8ZUuC--qL88YUEo",
    authDomain: "buggy-d8acd.firebaseapp.com",
    databaseURL: "https://buggy-d8acd.firebaseio.com",
    projectId: "buggy-d8acd",
    storageBucket: "buggy-d8acd.appspot.com",
    messagingSenderId: "629413586616"
});
const base = Rebase.createClass(app.database());

export let googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
export const auth = firebase.auth();
export default base;
