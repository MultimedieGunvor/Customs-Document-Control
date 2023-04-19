// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj0lHOgfnyWJF6Qf3aS1nPkqogYoSLUBs",
  authDomain: "customs-document-control.firebaseapp.com",
  projectId: "customs-document-control",
  storageBucket: "customs-document-control.appspot.com",
  messagingSenderId: "516878248480",
  appId: "1:516878248480:web:a4352e0075387849eaaa45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);