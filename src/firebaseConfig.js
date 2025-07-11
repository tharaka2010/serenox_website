import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCp8UF56DUVkEJG4cOflGTEFl1ivQjzWJY",
  authDomain: "sexeducation-c0902.firebaseapp.com",
  projectId: "sexeducation-c0902",
  storageBucket: "sexeducation-c0902.appspot.com",
  messagingSenderId: "305914583809",
  appId: "1:305914583809:web:587408614de793c339d900",
  measurementId: "G-65YF35TNK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
