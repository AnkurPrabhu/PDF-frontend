import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaDjYKPK_rKBh9T4aSrTmwSq2QXfzdqwk",
  authDomain: "pdf-manager-99c0d.firebaseapp.com",
  projectId: "pdf-manager-99c0d",
  storageBucket: "pdf-manager-99c0d.appspot.com",
  messagingSenderId: "654912100720",
  appId: "1:654912100720:web:4dd3daa51009f55e2a97b5",
  measurementId: "G-V1JZM6TL0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
