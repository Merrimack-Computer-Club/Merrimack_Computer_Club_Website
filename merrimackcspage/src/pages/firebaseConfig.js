// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCouKKUiY3ilrHpL4kD-OPGRAUgDLz55WY",
  authDomain: "web-development-final-7dd3e.firebaseapp.com",
  projectId: "web-development-final-7dd3e",
  storageBucket: "web-development-final-7dd3e.appspot.com",
  messagingSenderId: "1052801351450",
  appId: "1:1052801351450:web:bbc233e000af622e1c76a3",
  measurementId: "G-01RZWR8R4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
