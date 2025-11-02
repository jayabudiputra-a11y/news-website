// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Konfigurasi Firebase diambil dari environment (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDi_vQ993mXm0shQYnNwHAZH6pu7FUUTko",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "news-website-budi-putra-jaya.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "news-website-budi-putra-jaya",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "news-website-budi-putra-jaya.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "608872582689",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:608872582689:web:56cf9e0af7293412151d60",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QGDZ6PK4FP",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Database Firestore
export const db = getFirestore(app);

// Optional: Analytics (aktif hanya di browser, bukan di SSR)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };
