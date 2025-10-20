// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Gi_zr5e1Y-mIU2p_VdykbQDTOrc6_Rw",
  authDomain: "sabor-a-hogar-aeb8d.firebaseapp.com",
  projectId: "sabor-a-hogar-aeb8d",
  storageBucket: "sabor-a-hogar-aeb8d.firebasestorage.app",
  messagingSenderId: "796794932981",
  appId: "1:796794932981:web:bba86f5597b25b9485ffbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };