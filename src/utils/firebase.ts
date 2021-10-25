// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKJ-SyJ8ZyfY0zFVKVVlgIpsDQe8Wspz0",
  authDomain: "recomm-engine-mental-health.firebaseapp.com",
  databaseURL: "https://recomm-engine-mental-health-default-rtdb.firebaseio.com",
  projectId: "recomm-engine-mental-health",
  storageBucket: "recomm-engine-mental-health.appspot.com",
  messagingSenderId: "956938558075",
  appId: "1:956938558075:web:f15f592058315d16a6e0de",
  measurementId: "G-3KDVL3NBJE"
};

// Initialize Firebase
const firebaseApp  = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;