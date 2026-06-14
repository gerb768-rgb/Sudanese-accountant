import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1LLC8qRMc1R-Q3W-2Js1mBI...", // ضع القيمة الصحيحة من Firebase
  authDomain: "sudanes-accountant.firebaseapp.com",
  projectId: "sudanes-accountant",
  storageBucket: "sudanes-accountant.appspot.com",
  messagingSenderId: "رقمك",
  appId: "رقمك"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
