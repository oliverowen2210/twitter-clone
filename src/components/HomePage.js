import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

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
      let tweetData = [];
      qSnap.forEach((doc) => {
        tweetData.unshift(doc.data());
      });
      setTweets(tweetData);
    }

    getTweets();
  }, [tweets.length, db]);
  return (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid min-h-[99vh] max-w-[600px]">
      {window.location.pathname === "/" ? <Navigate to="/explore" /> : null}
      {props.showBar ? <SearchBar /> : null}
      <Tweets tweets={tweets} />
    </div>
  );
}
