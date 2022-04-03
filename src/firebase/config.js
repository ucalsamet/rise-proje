import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD09yZZV3YuICtQ-4e40FEPyYcACCNnxUk",
  authDomain: "rise-proje.firebaseapp.com",
  projectId: "rise-proje",
  storageBucket: "rise-proje.appspot.com",
  messagingSenderId: "484253446450",
  appId: "1:484253446450:web:55748934dba7704293272b",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { db, auth };
