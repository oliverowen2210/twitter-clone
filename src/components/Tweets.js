import { useState, useEffect } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import Tweet from "./Tweet";
import SVGs from "../images/SVGs";

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
      <div className="flex w-full h-[53px] max-w-[1000px] px-[16px] py-[6px]">
        <div className="bg-gray-200 rounded-l-full">
          <span className="flex items-center h-full pl-[12px] min-w-[32px]">
            <svg viewBox="0 0 24 24">
              <g>
                <path d={SVGs.glass} />
              </g>
            </svg>
          </span>
        </div>
        <input
          placeholder="Search Twitter"
          className="bg-gray-200 p-[12px] rounded-r-full cursor-text opacity-100 placeholder-black w-full text-black font-[15px]"
        ></input>
      </div>
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
