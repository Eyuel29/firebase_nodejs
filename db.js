const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');

const firebaseConfig  = require('./config');
const app = initializeApp(firebaseConfig);

const firestoreDB = getFirestore(app);

const todoCollection = collection(firestoreDB, 'allTodos');

module.exports = {
    todoCollection,
    firestoreDB,
}