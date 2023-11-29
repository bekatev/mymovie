import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNuLIBC8L8yG7MDWs87i0nPLfX1mN0XQU",
  authDomain: "my-movie-app-aef2d.firebaseapp.com",
  projectId: "my-movie-app-aef2d",
  storageBucket: "my-movie-app-aef2d.appspot.com",
  messagingSenderId: "90328577117",
  appId: "1:90328577117:web:8bd8cf441a9ac41ecb09b4",
  measurementId: "G-DK8JK4Z473",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
