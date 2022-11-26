import { useState, useEffect } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";

import SearchBar from "./SearchBar";
import Tweets from "./Tweets";

export default function HomePage(props) {
  let [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function getTweets() {
      if (tweets.length) return;
      console.log("getting tweets collection");
      const q = query(
        collection(props.db, "tweets"),
        orderBy("datePosted"),
        limit(20)
      );
      const qSnap = await getDocs(q);
      let newTweets = [];
      qSnap.forEach((doc) => {
        newTweets.unshift(doc.data());
      });
      setTweets(newTweets);
      return newTweets;
    }

    getTweets();
  }, [tweets.length, props.db]);
  return (
    <div className="border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      <SearchBar />
      <Tweets tweets={tweets} />
    </div>
  );
}
