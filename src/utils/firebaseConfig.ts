// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAnF8AZ4g8apCn0Fl_mb-kSOKNHzxv4GYc',
  authDomain: 'video-chat-c8c87.firebaseapp.com',
  projectId: 'video-chat-c8c87',
  storageBucket: 'video-chat-c8c87.appspot.com',
  messagingSenderId: '694373989716',
  appId: '1:694373989716:web:7c798afa2c064504099cc1',
  measurementId: 'G-C4VG2JHDF9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
// create useres collection
export const userRef = collection(firebaseDB, 'users');
// create meetings collection
export const meetingsRef = collection(firebaseDB, 'meetings');
