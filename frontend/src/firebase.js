import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBQOFaMWdqJDqv7b2NZGtpBNw7fvPZQVKY",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "serisense-ai.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "serisense-ai",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "serisense-ai.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "972366312954",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:972366312954:web:9047dd6c73569ccdc1e043"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;