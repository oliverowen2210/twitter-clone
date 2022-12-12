import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { DBContext, LayersContext } from "./App";
import Tweets from "./Tweets";
import SVGs from "../images/SVGs";
import ProfilePicBig from "./ProfilePicBig";

export default function ProfilePage(props) {
  let userHandle = useParams().userID;
  let [user, setUser] = useState(null);
  let [tweets, setTweets] = useState([]);
  const db = useContext(DBContext);
  const editModal = useContext(LayersContext).editProfile;

  useEffect(() => {
    async function getUserInfo() {
      let uidDocRef = doc(db, "handles", userHandle);
      let uidDoc = await getDoc(uidDocRef);
      let uid;
      try {
        uid = uidDoc.data().id;
      } catch (err) {
        window.location.href = "notFound";
      }
      let docRef = doc(db, "users", uid);
      let userDoc = await getDoc(docRef);
      let userInfo = userDoc.data();
      setUser(userInfo);
    }
    getUserInfo();
  }, [db, userHandle]);

  useEffect(() => {
    async function getTweets() {
      if (!user) return;
      let newTweets = [];
      for (let userTweet in user.tweets) {
        let tweet = user.tweets[userTweet];
        const tweetRef = doc(db, "tweets", tweet.id);
        const tweetDoc = await getDoc(tweetRef);
        const tweetData = tweetDoc.data();
        newTweets.unshift(tweetData);
      }
      setTweets(newTweets);
    }
    getTweets();
  }, [user, db]);

  return user ? (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      <Link to={`/`} className="sticky block flex py-1 top-0">
        <svg viewBox="0 0 24 24" className="ml-[10px] w-[20px] mr-[30px]">
          <g>
            <path d={SVGs.arrow.default} />
          </g>
        </svg>

        <div>
          <h2 className="font-bold text-xl">{user.username}</h2>
          <p className="text-sm">
            {Object.keys(user.tweets).length
              ? `${Object.keys(user.tweets).length} tweets`
              : null}
          </p>
        </div>
      </Link>

      <div className="flex relative border-b-[1px] border-solid border-gray-200">
        <div className="h-fit w-full flex flex-col">
          <div className="bg-gray-200 w-full h-[200px]" />
          <div className="flex flex-col px-[16px] h-[200px]">
            <div className="w-full flex h-[34%]">
              <div className="absolute min-w-[48px] h-auto w-[20%] mb-[12px] -mt-[13%]">
                <ProfilePicBig />
              </div>
              <div className="grow" />
              <button
                onClick={() => {
                  editModal.toggle(true);
                }}
                className="relative transition duration-300 hover:bg-gray-200 h-[36px] px-[10px] font-bold rounded-full outline outline-gray-300 outline-1 top-[12px]"
              >
                Edit Profile
              </button>
            </div>
            <div className="mt-[4px] mb-[12px]">
              <h3 className="font-bold text-lg">{user.username}</h3>
              <p className="text-gray-600">@{user.handle}</p>
            </div>
            <div>description</div>
          </div>
        </div>
      </div>

      <div>{tweets ? <Tweets tweets={tweets} /> : null}</div>
    </div>
  ) : (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      loading
    </div>
  );
}
