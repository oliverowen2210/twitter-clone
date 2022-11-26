import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import Tweets from "./Tweets";

export default function ProfilePage(props) {
  let [user, setUser] = useState(null);
  let [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      let uidDocRef = doc(props.db, "handles", props.user);
      let uidDoc = await getDoc(uidDocRef);
      let uid;
      try {
        uid = uidDoc.data().id;
      } catch (err) {
        window.location.href = "notFound";
      }
      let docRef = doc(props.db, "users", uid);
      let userDoc = await getDoc(docRef);
      let userInfo = userDoc.data();
      setUser(userInfo);
    }
    getUserInfo();
  }, [props.user]);

  useEffect(() => {
    async function getTweets() {
      if (!user) return;
      let newTweets = [];
      for (let tweet of user.tweets) {
        const tweetRef = doc(props.db, "tweets", tweet.id);
        const tweetDoc = await getDoc(tweetRef);
        const tweetData = tweetDoc.data();
        newTweets.unshift(tweetData);
      }
      setTweets(newTweets);
    }
    getTweets();
  }, [user]);

  return user ? (
    <div className="border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      <div className="border-b-[1px] border-solid border-gray-200">
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
    <div className="border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      loading
    </div>
  );
}
