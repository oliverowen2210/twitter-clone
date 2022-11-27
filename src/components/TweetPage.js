import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import Tweets from "./Tweets";
import SVGs from "../images/SVGs";

export default function TweetPage(props) {
  let tweetId = useParams().tweetID;
  let [tweet, setTweet] = useState(null);

  useEffect(() => {
    async function getTweet() {
      if (tweet) return;
      const tweetDoc = await getDoc(doc(props.db, "tweets", tweetId));
      setTweet(tweetDoc.data());
    }
    getTweet();
  }, [tweetId, props.db, tweet]);
  return tweet ? (
    <div className="border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      <Link to={`/${tweet.handle}`} className="sticky block flex p-3">
        <svg viewBox="0 0 24 24" className="w-[20px] mr-[30px]">
          <g>
            <path d={SVGs.bird} />
          </g>
        </svg>

        <h2 className="font-bold text-xl">Tweet</h2>
      </Link>
      <Tweets tweets={[tweet]} />
    </div>
  ) : (
    <p>Loading...</p>
  );
}
