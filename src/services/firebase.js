// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Bookmark functions
export const bookmarkService = {
  add: async (newsItem) => {
    try {
      const docRef = await addDoc(collection(db, 'bookmarks'), {
        ...newsItem,
        bookmarkedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  },

  remove: async (bookmarkId) => {
    try {
      await deleteDoc(doc(db, 'bookmarks', bookmarkId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookmarks'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      throw error;
    }
  },

  findByUuid: async (uuid) => {
    try {
      const q = query(collection(db, 'bookmarks'), where('uuid', '==', uuid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))[0];
    } catch (error) {
      console.error('Error finding bookmark:', error);
      throw error;
    }
  }
};