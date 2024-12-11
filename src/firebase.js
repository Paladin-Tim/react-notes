import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_ewthADCK5qkBtcO74DjaYsYHUks7Eok",
  authDomain: "react-notes-2c889.firebaseapp.com",
  projectId: "react-notes-2c889",
  storageBucket: "react-notes-2c889.firebasestorage.app",
  messagingSenderId: "822449088024",
  appId: "1:822449088024:web:6b6b8be80032a7e1d4056d",
  databaseURL:
    "https://react-notes-2c889-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
