import { useState, useEffect, createContext } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import {
  db,
  auth,
  storage,
  createAccount,
  login,
  logout,
} from "../firebase.js";
import {
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  deleteDoc,
  deleteField,
} from "firebase/firestore";

import Footer from "./Footer";
import Banner from "./Banner";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import TweetPage from "./TweetPage";
import NotFound from "./NotFound";
import Sidebar from "./Sidebar";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";
import UserInfoModal from "./UserInfoModal";
import TweetModal from "./TweetModal";
import TweetExtrasModal from "./TweetExtrasModal";
import EditProfileModal from "./EditProfileModal.js";

export const UserContext = createContext(null);
export const DBContext = createContext(null);
export const StorageContext = createContext(null);
export const LayersContext = createContext(null);
export const TweetContext = createContext(null);

/**TODO:
 * add bio and name changes
 * add account deletion
 */

function App() {
  let [user, setUser] = useState(null);
  let [layers, setLayers] = useState({
    signup: {
      show: false,
      toggle: function (state = true) {
        updateLayers((layers) => {
          layers.signup.show = state;
          layers.signup.show = state;
        });
      },
    },
    login: {
      show: false,
      toggle: function (state = true) {
        updateLayers((layers) => {
          layers.login.show = state;
        });
      },
    },
    userInfo: {
      show: false,
      position: { left: 0, bottom: 0 },
      toggle: function (state = true) {
        updateLayers((layers) => {
          layers.userInfo.show = state;
        });
      },
      setPosition: function (left, bottom) {
        updateLayers((layers) => {
          layers.userInfo.position = { left, bottom };
        });
      },
    },
    tweet: {
      show: false,
      toggle: function (state = true) {
        updateLayers((layers) => {
          layers.tweet.show = state;
        });
      },
    },
    tweetExtras: {
      show: false,
      position: { left: 0, top: 0 },
      tweet: null,
      toggle: function (state = true) {
        updateLayers((layers) => {
          layers.tweetExtras.show = state;
        });
      },
      setPosition: function (left, top) {
        updateLayers((layers) => {
          layers.tweetExtras.position = { left, top };
        });
      },
      setTweet: function (newTweet) {
        updateLayers((layers) => {
          layers.tweetExtras.tweet = newTweet;
        });
      },
    },
    editProfile: {
      show: false,
      toggle: function (state = true) {
        updateLayers((layers) => {
          layers.editProfile.show = state;
        });
      },
    },
    deleteAccount: {
      show: false,
      toggle: function (state = true) {
        updateLayers((layers) => {
          layers.deleteAccount.show = state;
        });
      },
    },
  });

  function updateLayers(func) {
    let newLayers = { ...layers };
    func(newLayers);
    setLayers(newLayers);
  }

  async function tweet(content, replyTo = null) {
    if (!user) return;

    let postDate = new Date();
    const collectionRef = collection(db, "tweets");
    const docRef = doc(collectionRef);
    const id = docRef.id;
    let tweet = {
      author: user.username,
      authorID: user.uid,
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
        [`replies.${id}`]: {
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
    window.location.reload();
  }

  async function deleteTweet(tweet) {
    let tweetID;
    if (tweet.originalID) tweetID = tweet.originalID;
    else tweetID = tweet.id;

    const tweetAuthorDocRef = doc(db, "users", tweet.authorID);
    await updateDoc(tweetAuthorDocRef, {
      [`tweets.${tweetID}`]: deleteField(),
    });

    /**if retweet, select the original tweet */

    const tweetDocRef = doc(db, "tweets", tweetID);
    await deleteDoc(tweetDocRef);

    /**if tweet was a reply, remove it from the replies of the tweet it was replying to */
    if (tweet.replyTo) {
      const replyDocRef = doc(db, "tweets", tweet.replyTo.id);
      await updateDoc(replyDocRef, {
        [`replies.${tweetID}`]: deleteField(),
      });
    }

    /**remove any likes */
    if (Object.keys(tweet.likes).length) {
      for (let like in tweet.likes) {
        const likeUserDocRef = doc(db, "users", tweet.likes[like].uid);
        await updateDoc(likeUserDocRef, {
          [`likes.${tweetID}`]: deleteField(),
        });
      }
    }

    /**remove any retweets */
    if (Object.keys(tweet.retweets).length) {
      for (let retweet in tweet.retweets) {
        const retweetID = tweet.retweets[retweet].retweetID;
        const retweetDocRef = doc(db, "tweets", retweetID);
        await deleteDoc(retweetDocRef);
        const retweeterUserDocRef = doc(
          db,
          "users",
          tweet.retweets[retweet].uid
        );
        await updateDoc(retweeterUserDocRef, {
          [`retweets.${tweetID}`]: deleteField(),
          [`tweets.${retweetID}`]: deleteField(),
        });
      }
    }
  }

  async function deleteAccount() {
    try {
      await deleteUser(auth.currentUser);
    } catch (err) {
      return;
    }
    if (Object.keys(user.tweets).length) {
      for (let tweet in user.tweets) {
        const tweetRef = doc(db, "tweets", tweet.id);
        const tweetDoc = await getDoc(tweetRef);
        const tweetData = tweetDoc.data();
        await deleteTweet(tweetData);
      }
    }
    await deleteDoc(db, "handles", user.handle);
    await deleteDoc(db, "users", user.uid);
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
    <LayersContext.Provider value={layers}>
      <DBContext.Provider value={db}>
        <StorageContext.Provider value={storage}>
          <TweetContext.Provider value={tweet}>
            <UserContext.Provider value={user}>
              <Router>
                <div id="layers">
                  <SignUpModal signupFunc={createAccount} />
                  <SignUpModal signupFunc={createAccount} />
                  <LogInModal loginFunc={login} />
                  <UserInfoModal
                    logoutFunc={logout}
                    deleteFunc={deleteAccount}
                  />
                  <TweetModal tweetFunc={tweet} />
                  <TweetExtrasModal deleteFunc={deleteTweet} />
                  <EditProfileModal />
                </div>
                <div className={"z-10 flex min-h-[100vh] overflow-x-hidden"}>
                  <Banner logoutFunc={logout} />
                  <div className="grow w-[600px] lg:w-[990px] flex">
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
                        <Route path="*" element={<HomePage />} />
                      </Routes>
                      <div className="w-[290px] mr-[10px] lg:w-[350px] hidden lg:block">
                        <Routes>
                          <Route
                            path="/explore"
                            element={<Sidebar noBar={true} user={user} />}
                          />
                          <Route path="/notFound" element={<div />} />
                          <Route path="*" element={<Sidebar user={user} />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                  {user ? null : <Footer />}
                </div>
              </Router>
            </UserContext.Provider>
          </TweetContext.Provider>
        </StorageContext.Provider>
      </DBContext.Provider>
    </LayersContext.Provider>
  );
}

export default App;
