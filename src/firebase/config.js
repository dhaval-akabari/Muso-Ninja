import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6mopv6mpC1xzaFSvQw1YGXPcZizIi-Ps",
  authDomain: "muso-ninja-2b258.firebaseapp.com",
  projectId: "muso-ninja-2b258",
  storageBucket: "muso-ninja-2b258.appspot.com",
  messagingSenderId: "410489866814",
  appId: "1:410489866814:web:a255acc504046a171f9f6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const timestamp = serverTimestamp();

export { db, timestamp };
