// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyD6O3FaC9UJqdZLl0mwZhwsfb_vh8fqZq0",
  authDomain: "doctors-portal-cse499.firebaseapp.com",
  projectId: "doctors-portal-cse499",
  storageBucket: "doctors-portal-cse499.appspot.com",
  messagingSenderId: "64618738207",
  appId: "1:64618738207:web:35989ac9cf7aa3590d5b2a"
  };

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;