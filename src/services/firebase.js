import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration for G Dance (tancweboldal)
// Values are read from environment variables or fallback to project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoPlaceholderKeyForGDance123456",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tancweboldal.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tancweboldal",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tancweboldal.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "73848932343",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:73848932343:web:demoPlaceholderAppId",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DEMOGDANCE"
};

let app;
let db;
let auth;
let storage;
let isFirebaseAvailable = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
  isFirebaseAvailable = true;
} catch (error) {
  console.warn("Firebase initialization warning (using resilient local database mode):", error.message);
}

export { app, db, auth, storage, isFirebaseAvailable, firebaseConfig };
