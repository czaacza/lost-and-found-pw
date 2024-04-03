import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOp6_3PwkD6iCPYKFqLBghjGR6QcO4SIM',
  authDomain: 'budgettracker-a2e18.firebaseapp.com',
  projectId: 'budgettracker-a2e18',
  storageBucket: 'budgettracker-a2e18.appspot.com',
  messagingSenderId: '46910043982',
  appId: '1:46910043982:web:624f3986f12ffa9105d01f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);

export default app;
