import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAormp3xdgBC5nZpEP-qA7cbyEjbpXYEtA",
  authDomain: "ruinning-firebase.firebaseapp.com",
  projectId: "ruinning-firebase",
  storageBucket: "ruinning-firebase.firebasestorage.app",
  messagingSenderId: "1061502919245",
  appId: "1:1061502919245:web:316e1b7cc2bc3bcfce3204"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)