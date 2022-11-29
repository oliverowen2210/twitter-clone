import { useState, useEffect, createContext } from "react";
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

export const UserContext = createContext(null);
export const DBContext = createContext(null);
export const ModalContext = createContext(null);

/**TODO:
 * style login modal
 * style signup page
 *
 * add replies
 * add retweets
 * add profile pics
 * add tweeting page
 * add searchbar functionality
 * add follows
 * make home only show tweets by followed users
 *
 * change sidebar when logged in?
 */

function App(props) {
  let [user, setUser] = useState(null);
  let [showModal, setShowModal] = useState(false);

  async function tweet(content, replyTo = null) {
    if (!user) return;
    let postDate = new Date();
    const collectionRef = collection(db, "tweets");
    const docRef = doc(collectionRef);
    const id = docRef.id;
    const tweet = {
      author: user.username,
      handle: user.handle,
      datePosted: postDate,
      content: content,
      retweets: {},
      likes: {},
      replies: {},
      replyTo,
      id,
    };

    await setDoc(docRef, tweet);

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      tweets: arrayUnion({
        id,
      }),
    });
    window.location.reload();
  }

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
    <ModalContext.Provider value={(state) => setShowModal(state)}>
      <DBContext.Provider value={db}>
        <UserContext.Provider value={user}>
          <Router>
            <div className={"flex min-h-[100vh] overflow-x-hidden"}>
              <LogInModal
                open={showModal}
                closeFunc={() => {
                  setShowModal(false);
                }}
                loginFunc={login}
              />
              <Banner logoutFunc={logout} />
              <div className="grow flex">
                <div className="flex">
                  <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route
                      path="/explore"
                      element={<HomePage showBar={true} />}
                    />
                    <Route path="notFound" element={<NotFound />} />
                    <Route path="/:userID" element={<ProfilePage />} />
                    <Route path="/tweet/:tweetID" element={<TweetPage />} />
                    <Route
                      path="/signup"
                      element={
                        <SignupPage auth={{ login, register: createAccount }} />
                      }
                    />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                  <div className="w-[290px] lg:w-[350px] flex grow hidden lg:block">
                    <Routes>
                      <Route
                        path="/explore"
                        element={<Sidebar noBar={true} />}
                      />
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
          </Router>
        </UserContext.Provider>
      </DBContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
