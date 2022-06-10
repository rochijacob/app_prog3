// Import the functions you need from the SDKs you need
import app from 'firebase/app'
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2c3oEEsYkPdJAtQSL80svTf2gaFDMaUA",
  authDomain: "prog3-ac1e9.firebaseapp.com",
  projectId: "prog3-ac1e9",
  storageBucket: "prog3-ac1e9.appspot.com",
  messagingSenderId: "875279288019",
  appId: "1:875279288019:web:619c3bed115853779db626"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()