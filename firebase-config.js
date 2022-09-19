import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Storage and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
