// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCa2FddPcMlNkbdD7JXrliM44ijjo2pNUo",
  authDomain: "meet-purple.firebaseapp.com",
  projectId: "meet-purple",
  storageBucket: "meet-purple.appspot.com",
  messagingSenderId: "565300045923",
  appId: "1:565300045923:web:48ab664123162519ca3056"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}