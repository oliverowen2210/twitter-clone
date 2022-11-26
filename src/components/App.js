import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { db, auth, createAccount, login, logout } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Twitter from "./Twitter";
import SignupPage from "./SignupPage";

function App(props) {
  let [user, setUser] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/" && user) {
      window.location.href = "/home";
    }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      console.log("auth state change in app");
      if (newUser) {
        let docRef = doc(db, "users", newUser.uid);
        let docData = await getDoc(docRef);
        let userInfo = await docData.data();
        setUser(userInfo);
      } else {
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const twitterEl = <Twitter user={user} db={db} auth={{ login, logout }} />;
  return (
    <Router>
      <Routes>
        <Route index element={twitterEl} />
        <Route path="/home" element={twitterEl} />
        <Route path="/explore" element={twitterEl} />
        <Route
          path="notFound"
          element={
            <Twitter
              notFound={true}
              user={user}
              db={db}
              auth={{ login, logout }}
            />
          }
        />
        <Route path="/:user" element={twitterEl} />
        <Route
          path="/signup"
          element={<SignupPage auth={{ login, register: createAccount }} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
