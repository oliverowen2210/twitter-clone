import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { db, auth, createAccount, login } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Twitter from "./Twitter";
import SignupPage from "./SignupPage";

function App(props) {
  let [user, setUser] = useState(null);
  onAuthStateChanged(auth, async (newUser) => {
    if (newUser) {
      let docRef = doc(db, "users", newUser.uid);
      let docData = await getDoc(docRef);
      let userInfo = await docData.data();
      setUser(userInfo);
    }
  });

  const twitterEl = <Twitter user={user} db={db} auth={{ login }} />;
  return (
    <Router>
      <Routes>
        <Route index element={twitterEl} />
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
