import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { db, auth, createAccount, login, logout } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";

import SignupPage from "./SignupPage";
import Footer from "./Footer";
import Banner from "./Banner";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import TweetPage from "./TweetPage.js";
import NotFound from "./NotFound.js";
import Sidebar from "./Sidebar";
import LogInModal from "./LogInModal";

function App(props) {
  let [user, setUser] = useState(null);

  let [showModal, setShowModal] = useState(false);

  async function tweet(content, replyTo = null) {
    if (!props.user) return;
    let postDate = new Date();
    const collectionRef = collection(props.db, "tweets");
    const docRef = doc(collectionRef);
    const id = docRef.id;
    const tweet = {
      author: props.user.username,
      handle: props.user.handle,
      datePosted: postDate,
      content: content,
      retweets: [],
      likes: [],
      replies: [],
      replyTo,
      id,
    };

    await setDoc(docRef, tweet);

    const userDocRef = doc(props.db, "users", props.user.uid);
    await updateDoc(userDocRef, {
      tweets: arrayUnion({
        id,
      }),
    });
    window.location.reload();
  }

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

  return (
    <Router>
      <div className={"flex min-h-[100vh] overflow-x-hidden"}>
        <LogInModal
          open={showModal}
          closeFunc={() => {
            setShowModal(false);
          }}
          loginFunc={login}
        />
        <Banner user={props.user} logoutFunc={logout} />
        <div className="grow flex">
          <div className="flex">
            <Routes>
              <Route index element={<HomePage db={db} user={user} />} />
              <Route path="/home" element={<HomePage db={db} user={user} />} />
              <Route
                path="/explore"
                element={<HomePage db={db} user={user} />}
              />
              <Route
                path="notFound"
                element={<NotFound db={db} user={user} />}
              />
              <Route
                path="/:userID"
                element={<ProfilePage db={db} user={user} />}
              />
              <Route
                path="/tweet/:tweetID"
                element={<TweetPage db={db} user={user} />}
              />
              <Route
                path="/signup"
                element={
                  <SignupPage auth={{ login, register: createAccount }} />
                }
              />
            </Routes>
            <div className="w-[290px] lg:w-[350px] flex grow">
              <Routes>
                <Route path="/home" element={<Sidebar noBar={true} />} />

                <Route path="*" element={<Sidebar />} />
              </Routes>
            </div>
          </div>
        </div>
        {user ? null : (
          <Footer
            loginFunc={(state) => {
              setShowModal(state);
            }}
          />
        )}
        <button
          onClick={() => {
            tweet("i sniff socks");
          }}
        >
          xd
        </button>
      </div>
      <Routes></Routes>
    </Router>
  );
}

export default App;
