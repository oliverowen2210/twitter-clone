import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

import { DBContext } from "./App";
import Tweets from "./Tweets";
import SVGs from "../images/SVGs";

export default function TweetPage(props) {
  let tweetId = useParams().tweetID;
  let [tweet, setTweet] = useState(null);
  let [reply, setReply] = useState(null);
  let [secondReply, setSecondReply] = useState(null);
  const db = useContext(DBContext);

  useEffect(() => {
    async function getTweet() {
      if (tweet && tweet.id === tweetId) return;
      const tweetDoc = await getDoc(doc(db, "tweets", tweetId));
      setTweet(tweetDoc.data());
    }

    async function getReplies() {
      console.log("getting replies");
      if (!tweet || !tweet.replyTo) return;
      const replyDoc = await getDoc(doc(db, "tweets", tweet.replyTo.id));
      const replyData = replyDoc.data();
      setReply(replyData);

      if (!replyData.replyTo) return;
      const secondReplyDoc = await getDoc(
        doc(db, "tweets", replyData.replyTo.id)
      );
      const secondReplyData = secondReplyDoc.data();
      setSecondReply(secondReplyData);
    }

    getTweet();
    getReplies();
  }, [tweetId, db, tweet]);

  return tweet ? (
    <div className="border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      <Link to={`/${tweet.handle}`} className="sticky block flex p-3">
        <svg viewBox="0 0 24 24" className="w-[20px] mr-[30px]">
          <g>
            <path d={SVGs.arrow.default} />
          </g>
        </svg>

        <h2 className="font-bold text-xl">Tweet</h2>
      </Link>

      {secondReply ? (
        <Tweets tweets={[secondReply]} isReply={true} noBorder={true} />
      ) : null}
      {reply ? (
        <Tweets tweets={[reply]} isReply={true} noBorder={true} />
      ) : null}
      <Tweets tweets={[tweet]} big={true} noBorder={true} />
    </div>
  ) : (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      Loading...
    </div>
  );
}
