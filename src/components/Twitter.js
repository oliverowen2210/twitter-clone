import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import ProfilePage from "./ProfilePage";
import Sidebar from "./Sidebar";
import LogInModal from "./LogInModal";

export default function Twitter(props) {
  let [showModal, setShowModal] = useState(false);
  let userPage = useParams().user;

  async function tweet(content, replyTo = null) {
    if (!props.user) return;
    let postDate = new Date();
    const id = doc(collection(this.db, "tweets")).id;
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
    const docRef = await addDoc(collection(props.db, "tweets", id), tweet);
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
        {props.notFound ? (
          <div className="w-[600px] lg:w-[920px] xl:w-[990px] flex grow justify-center">
            <div className="flex flex-col items-center p-[24px] mt-[40px]">
              <div>
                Hmm...this page doesn’t exist. Try searching for something else.
              </div>
              <Link to="/explore">
                <button className="hover:bg-red-600 mt-[32px] bg-red-500 border-solid border-[1px] border-black text-white font-bold px-[16px] py-[8px] rounded-full">
                  Search
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-[600px] lg:w-[920px] xl:w-[990px] flex grow">
            {userPage ? (
              <ProfilePage db={props.db} user={userPage} />
            ) : (
              <HomePage db={props.db} user={props.user} />
            )}
            <Sidebar />
          </div>
        )}
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
