// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBji4s7SYo16dcM05aOikjnRm0H4I_ocTw",
  authDomain: "ticket-tout-bc7a5.firebaseapp.com",
  projectId: "ticket-tout-bc7a5",
  storageBucket: "ticket-tout-bc7a5.firebasestorage.app",
  messagingSenderId: "1022920260906",
  appId: "1:1022920260906:web:b7450ff90239326572f253",
  measurementId: "G-6RM9GKZ8QY"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);