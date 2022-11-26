import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  addDoc,
  updateDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";

import Footer from "./Footer";
import Banner from "./Banner";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import LogInModal from "./LogInModal";

export default function Twitter(props) {
  let [showModal, setShowModal] = useState(false);
  let userPage = useParams().user;

  async function tweet(content, replyTo = null) {
    if (!props.user) return;
    let postDate = new Date();
    const tweet = {
      author: props.user.username,
      handle: props.user.handle,
      datePosted: postDate,
      content: content,
      retweets: [],
      likes: [],
      replies: [],
      replyTo,
    };
    const docRef = await addDoc(collection(props.db, "tweets"), tweet);
    const userDocRef = doc(props.db, "users", props.user.uid);
    updateDoc(userDocRef, {
      tweets: arrayUnion({
        content,
        id: docRef.id,
        replyTo,
      }),
    });
    return tweet;
  }

  return (
    <div className={"flex min-h-[100vh] overflow-x-hidden"}>
      <LogInModal
        open={showModal}
        closeFunc={() => {
          setShowModal(false);
        }}
        loginFunc={props.auth.login}
      />
      <Banner user={props.user} logoutFunc={props.auth.logout} />
      <div className="grow">
        <div className="w-[600px] lg:w-[920px] xl:w-[990px] flex grow">
          {userPage ? (
            <Profile db={props.db} user={userPage} />
          ) : (
            <HomePage db={props.db} user={props.user} />
          )}
          <Sidebar />
        </div>
      </div>
      {props.user ? null : (
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
  );
}
