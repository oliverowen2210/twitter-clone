import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./components/App";

/**firebase setup */

import * as firebase from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyDPy8ZjzbrfkdXSb_j54C9XmfUmx4gwtwc",
  authDomain: "twitter-clone-ac1e7.firebaseapp.com",
  projectId: "twitter-clone-ac1e7",
  storageBucket: "twitter-clone-ac1e7.appspot.com",
  messagingSenderId: "186999066408",
  appId: "1:186999066408:web:fb84e1b9f91f2921ffca1d",
  measurementId: "G-PF0Y4LYY18",
};

const app = firebase.initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);

/**auth setup */

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
  }
});

async function createAccount(username, handle, email, password) {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  const user = response.user;
  const joinDate = new Date();
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    username,
    handle,
    password,
    email,
    authProvider: "local",
    joinDate: {
      date: joinDate,
      year: joinDate.getFullYear(),
      month: joinDate.getMonth(),
      day: joinDate.getDate(),
      hour: joinDate.getHours(),
    },
  });
}

async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
}

export default app;
export { db, createAccount, login };

/**end of firebase/auth setup */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App firebase={{ db, auth: { login: login, register: createAccount } }} />
  </React.StrictMode>
);
