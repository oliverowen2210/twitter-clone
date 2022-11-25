/**firebase setup */

import * as firebase from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signOut,
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
let user = null;
console.log("set firebase");

/**auth setup */

async function createAccount(username, handle, email, password) {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  const user = response.user;
  const joinDate = new Date();
  console.log("creating account");
  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    uid: user.uid,
    handle,
    authProvider: "local",
    joinDate: {
      date: joinDate,
      year: joinDate.getFullYear(),
      month: joinDate.getMonth(),
      day: joinDate.getDate(),
      hour: joinDate.getHours(),
    },
    tweets: [],
  });
  await login(email, password);
}

async function login(email, password) {
  try {
    console.log("logging in");
    await signInWithEmailAndPassword(auth, email, password);
    user = auth;
  } catch (err) {
    console.log(err);
  }
}

async function logout() {
  try {
    console.log("logging out");
    await signOut(auth);
  } catch (err) {
    console.log(err);
    window.location.href = "/";
  }
}

export default app;
export { db, auth, user, createAccount, login, logout };
