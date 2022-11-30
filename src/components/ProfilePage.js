import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { DBContext } from "./App";
import Tweets from "./Tweets";
import SVGs from "../images/SVGs";

export default function ProfilePage(props) {
  let userHandle = useParams().userID;
  let [user, setUser] = useState(null);
  let [tweets, setTweets] = useState([]);
  const db = useContext(DBContext);

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
      for (let tweet of user.tweets) {
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
      <Link to={`/`} className="sticky block flex p-3">
        <svg viewBox="0 0 24 24" className="w-[20px] mr-[30px]">
          <g>
            <path d={SVGs.arrow.default} />
          </g>
        </svg>

        <h2 className="font-bold text-xl">{user.username}</h2>
      </Link>

      <div className="flex border-b-[1px] border-solid border-gray-200">
        <div>background image</div>
        <div className="profilepic rounded-full penguin w-[100px]"></div>
        <div>
          <h3>{user.username}</h3>
          <p>{user.handle}</p>
          <p>other stuff</p>
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
