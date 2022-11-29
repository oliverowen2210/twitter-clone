import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

import { DBContext } from "./App";
import SearchBar from "./SearchBar";
import Tweets from "./Tweets";

export default function HomePage(props) {
  let [tweets, setTweets] = useState([]);
  const db = useContext(DBContext);

  useEffect(() => {
    async function getTweets() {
      if (tweets.length) return;
      console.log("getting tweets collection");
      const q = query(collection(db, "tweets"), orderBy("datePosted"));
      const qSnap = await getDocs(q);
      let newTweets = [];
      for (const doc of qSnap) {
        const tweetData = doc.data();
        if (!!tweetData.originalID) {
          const docRef = doc(db, "tweets", tweetData.originalID);
          const tweetDoc = await getDoc(docRef);
          const tweetData = tweetDoc.data();
        }
        newTweets.unshift(tweetData);
      }
      setTweets(newTweets);
      return newTweets;
    }

    getTweets();
  }, [tweets.length, db]);
  return (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      {window.location.pathname === "/" ? <Navigate to="/explore" /> : null}
      {props.showBar ? <SearchBar /> : null}
      <Tweets tweets={tweets} />
    </div>
  );
}
