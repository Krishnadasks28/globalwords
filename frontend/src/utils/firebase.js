// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPoNGU0A0PDsS-NOvdg-Wz-0qpsQMjt-Y",
  authDomain: "globalwords-f6ba8.firebaseapp.com",
  databaseURL: "https://globalwords-f6ba8-default-rtdb.firebaseio.com",
  projectId: "globalwords-f6ba8",
  storageBucket: "globalwords-f6ba8.appspot.com",
  messagingSenderId: "883990029024",
  appId: "1:883990029024:web:453148f9b6d6bed2c0e685",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
