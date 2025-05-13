import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_...",
  authDomain: "bella-spritz-eshop.firebaseapp.com",
  projectId: "bella-spritz-eshop",
  storageBucket: "bella-spritz-eshop.appspot.com",
  messagingSenderId: "547469318213",
  appId: "1:547469318213:web:...",
  measurementId: "G-P68Z3P6NQY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
