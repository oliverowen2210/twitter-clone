import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { UserContext, DBContext, LayersContext } from "./App";
import Tweets from "./Tweets";
import SVGs from "../images/SVGs";
import ProfilePic from "./ProfilePic";

export default function ProfilePage(props) {
  let currentUser = useContext(UserContext);
  let userHandle = useParams().userID;
  let [userData, setUserData] = useState(null);
  let [tweets, setTweets] = useState([]);
  const db = useContext(DBContext);
  const editModal = useContext(LayersContext).editProfile;

  useEffect(() => {
    async function getUserData() {
      let uidRef = doc(db, "handles", userHandle);
      let uidDoc = await getDoc(uidRef);
      let uid;
      try {
        uid = uidDoc.data().id;
      } catch (err) {
        window.location.href = "notFound";
      }
      let docRef = doc(db, "users", uid);
      let userDoc = await getDoc(docRef);
      let userInfo = userDoc.data();
      setUserData(userInfo);
    }
    getUserData();
  }, [db, userHandle]);

  useEffect(() => {
    async function getTweets() {
      if (!userData) return;
      let newTweets = [];
      for (let userTweet in userData.tweets) {
        let tweet = userData.tweets[userTweet];
        const tweetRef = doc(db, "tweets", tweet.id);
        const tweetDoc = await getDoc(tweetRef);
        const tweetData = tweetDoc.data();
        newTweets.unshift(tweetData);
      }
      setTweets(newTweets);
    }
    getTweets();
  }, [userData, db]);

  return userData ? (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      <Link to={`/`} className="sticky block flex py-1 top-0">
        <svg viewBox="0 0 24 24" className="ml-[10px] w-[20px] mr-[30px]">
          <g>
            <path d={SVGs.arrow.default} />
          </g>
        </svg>

        <div>
          <h2 className="font-bold text-xl">{userData.username}</h2>
          <p className="text-sm">
            {Object.keys(userData.tweets).length
              ? `${Object.keys(userData.tweets).length} tweets`
              : null}
          </p>
        </div>
      </Link>

      <div className="flex relative border-b-[1px] border-solid border-gray-200">
        <div className="h-fit w-full pb-[8px] flex flex-col">
          <div
            style={
              userData.banner
                ? { backgroundImage: `url(${userData.banner})` }
                : null
            }
            className="bg-gray-200 bg-center bg-no-repeat bg-cover w-full h-[200px]"
          />
          <div
            className={
              (userData.bio || userData.bio === ""
                ? "h-fit "
                : "h-[200px] justify-between") + "flex flex-col px-[16px]"
            }
          >
            <div className="w-full flex h-[34%]">
              <div className="absolute min-w-[48px] h-auto w-[20%] mb-[12px] -mt-[13%]">
                <ProfilePic big={true} id={userData.uid} />
              </div>
              <div className="grow" />
              {userData.uid === currentUser.uid ? (
                <button
                  onClick={() => {
                    editModal.toggle(true);
                  }}
                  className="relative transition duration-300 hover:bg-gray-200 h-[36px] px-[10px] font-bold rounded-full outline outline-gray-300 outline-1 top-[12px]"
                >
                  Edit Profile
                </button>
              ) : null}
            </div>
            <div className="mt-[56px] mb-[12px] z-0">
              <h3 className="font-bold text-lg">{userData.username}</h3>
              <p className="text-gray-600">@{userData.handle}</p>
            </div>
            {userData.bio ? <div>{userData.bio}</div> : null}
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
