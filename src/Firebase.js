// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvunb7h2SV9eLuvMKsrkqc6mqTuypZLBQ",
  authDomain: "e-commerce-29183.firebaseapp.com",
  projectId: "e-commerce-29183",
  storageBucket: "e-commerce-29183.appspot.com",
  messagingSenderId: "177208884753",
  appId: "1:177208884753:web:54434d7f5c6ed20c3f3bb0",
  measurementId: "G-LJPBBQQ3BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
     console.log(result);
    })
    .catch((err) => { 
      console.log("Errorrr", err)
    })
}
export const signOutFromGoogle  = () =>{
  signOut(auth)
  .then(() => {
    console.log("Usuario desconectado");
  })
  .catch((err) => {
    console.error("Error al cerrar sesión", err);
  }); 
}

export const storage = getStorage(app);