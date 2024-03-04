import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDo0lWA9jmxSJkUgTX4EBJ0X_f1tTsBSgU",
  authDomain: "kindy-69e36.firebaseapp.com",
  projectId: "kindy-69e36",
  storageBucket: "kindy-69e36.appspot.com",
  messagingSenderId: "179727907792",
  appId: "1:179727907792:web:275f1365b4e14bcb9857d5"
};

const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app)


export default imageDb ;
