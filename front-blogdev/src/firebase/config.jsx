import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFireStore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUqLmgtH9HiVJABOz3XN2WM1dP4S0uVnc",
  authDomain: "blogdev-ll.firebaseapp.com",
  projectId: "blogdev-ll",
  storageBucket: "blogdev-ll.appspot.com",
  messagingSenderId: "767069743085",
  appId: "1:767069743085:web:2abb364e9924e24deee9e4",
  measurementId: "G-MC6QEDJGQJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFireStore(app);

export{db}