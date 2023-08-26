// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWnM_sJAN6F7dpplV24coorpV0O35ioaU",
  authDomain: "breakfast-cooking-game.firebaseapp.com",
  projectId: "breakfast-cooking-game",
  storageBucket: "breakfast-cooking-game.appspot.com",
  messagingSenderId: "228402986359",
  appId: "1:228402986359:web:a569c9b702f056c7fab572",
  measurementId: "G-QPCD8PVT2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
