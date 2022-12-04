import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

import { UserContext, DBContext } from "./App";
import Tweets from "./Tweets";
import ReplyBox from "./ReplyBox";
import SVGs from "../images/SVGs";

export default function TweetPage(props) {
  let tweetId = useParams().tweetID;
  let [tweet, setTweet] = useState(null);
  let [topReply, setTopReply] = useState(null);
  let [secondTopReply, setSecondTopReply] = useState(null);
  let [bottomReplies, setBottomReplies] = useState([]);
  const user = useContext(UserContext);
  const db = useContext(DBContext);

  useEffect(() => {
    async function getTweet() {
      if (tweet && tweet.id === tweetId) return;
      const tweetDoc = await getDoc(doc(db, "tweets", tweetId));
      setTweet(tweetDoc.data());
    }

    async function getTopReplies() {
      console.log("getting replies");
      if (!tweet || !tweet.replyTo) return;
      const replyDoc = await getDoc(doc(db, "tweets", tweet.replyTo.id));
      const replyData = replyDoc.data();
      setTopReply(replyData);

      if (!replyData.replyTo) return;
      const secondReplyDoc = await getDoc(
        doc(db, "tweets", replyData.replyTo.id)
      );
      const secondReplyData = secondReplyDoc.data();
      setSecondTopReply(secondReplyData);
    }

    async function getBottomReplies() {
      if (!tweet || !tweet.replies) return;
      let newBottomReplies = [];
      for (let i = 0; i < tweet.replies.length; i++) {
        const replyID = tweet.replies[i];
        const replyDoc = await getDoc(doc(db, "tweets", replyID));
        const replyData = replyDoc.data();
        newBottomReplies.unshift(replyData);
      }
      setBottomReplies(newBottomReplies);
    }

    getTweet();
    getTopReplies();
    getBottomReplies();
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

      {secondTopReply ? (
        <Tweets tweets={[secondTopReply]} isReply={true} noBorder={true} />
      ) : null}

      {topReply ? (
        <Tweets tweets={[topReply]} isReply={true} noBorder={true} />
      ) : null}

      <Tweets tweets={[tweet]} big={true} noBorder={true} />

      {user ? <ReplyBox /> : null}

      {bottomReplies ? <Tweets tweets={bottomReplies} /> : null}
    </div>
  ) : (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      Loading...
    </div>
  );
}
