// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAZX3s9pjNY2nQsn_zPphbY_OFwbY8dM44',
    authDomain: 'movie-app-firebase-42d63.firebaseapp.com',
    projectId: 'movie-app-firebase-42d63',
    storageBucket: 'movie-app-firebase-42d63.appspot.com',
    messagingSenderId: '556303389020',
    appId: '1:556303389020:web:ebbb9403c9c6dbae343199',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
