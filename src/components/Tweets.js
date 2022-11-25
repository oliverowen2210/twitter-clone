import { useState, useEffect } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import Tweet from "./Tweet";
import SearchBar from "./SearchBar";

export default function Tweets(props) {
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
        newTweets.push(doc.data());
      });
      setTweets(newTweets);
      return newTweets;
    }

    getTweets();
  }, [tweets, props.db]);

  return (
    <div className="border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      <SearchBar />
      <ul>
        {tweets.length
          ? tweets.map((tweet) => (
              <Tweet
                author={tweet.author}
                handle={tweet.handle}
                content={tweet.content}
                datePosted={tweet.datePosted}
                likes={tweet.likes}
                replies={tweet.replies}
                replyTo={tweet.replyTo}
                retweets={tweet.retweets}
                key={`${tweet.author} ${tweet.datePosted}`}
              />
            ))
          : null}
      </ul>
    </div>
  );
}
