import { useState, useEffect, createContext } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { db, auth, createAccount, login, logout } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, collection } from "firebase/firestore";

import SignupPage from "./SignupPage";
import Footer from "./Footer";
import Banner from "./Banner";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import TweetPage from "./TweetPage.js";
import NotFound from "./NotFound.js";
import Sidebar from "./Sidebar";
import LogInModal from "./LogInModal";
import UserInfoModal from "./UserInfoModal.js";

export const UserContext = createContext(null);
export const DBContext = createContext(null);
export const LayersContext = createContext(null);
export const TweetContext = createContext(null);

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
  let [layers, setLayers] = useState({
    login: {
      show: false,
      toggle: function (state = true) {
        let newLayers = { ...layers };
        newLayers.login.show = state;
        setLayers(newLayers);
      },
    },
    userInfo: {
      show: false,
      position: { left: 0, bottom: 0 },
      toggle: function (state = true) {
        let newLayers = { ...layers };
        newLayers.userInfo.show = state;
        setLayers(newLayers);
      },
      setPosition: function (left, bottom) {
        let newLayers = { ...layers };
        newLayers.userInfo.position = { left, bottom };
        setLayers(newLayers);
      },
    },
  });

  async function tweet(content, replyTo = null) {
    if (!user) return;

    let postDate = new Date();
    const collectionRef = collection(db, "tweets");
    const docRef = doc(collectionRef);
    const id = docRef.id;
    let tweet = {
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

    if (replyTo) {
      let replyID = replyTo.id;
      let replyDocRef = doc(db, "tweets", replyID);

      let newReplyToField = {};
      newReplyToField.id = replyID;
      newReplyToField.handle = replyTo.handle;

      tweet.replyTo = newReplyToField;
      await updateDoc(replyDocRef, {
        [`replies.${replyID}`]: {
          id,
        },
      });
    }

    await setDoc(docRef, tweet);

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      [`tweets.${id}`]: {
        id,
      },
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

  /**chjange to use state */

  return (
    <LayersContext.Provider value={layers}>
      <DBContext.Provider value={db}>
        <TweetContext.Provider value={tweet}>
          <UserContext.Provider value={user}>
            <Router>
              <div id="layers">
                <LogInModal loginFunc={login} />
                <UserInfoModal logoutFunc={logout} />
              </div>
              <div className={"z-10 flex min-h-[100vh] overflow-x-hidden"}>
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
                          <SignupPage
                            auth={{ login, register: createAccount }}
                          />
                        }
                      />
                      <Route path="*" element={<HomePage />} />
                    </Routes>
                    <div className="w-[290px] lg:w-[350px] hidden lg:block">
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
                {user ? null : <Footer />}
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
        </TweetContext.Provider>
      </DBContext.Provider>
    </LayersContext.Provider>
  );
}

export default App;
