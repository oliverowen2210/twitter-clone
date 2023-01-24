import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

import { UserContext, DBContext } from "./App";
import Tweets from "./Tweets";
import DeletedTweet from "./DeletedTweet";
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
      const tweetData = tweetDoc.data();
      if (tweetData === undefined) {
        setTweet("deleted");
      } else setTweet(tweetData);
    }

    async function getTopReplies() {
      console.log("getting replies");
      if (!tweet || tweet === "deleted" || !tweet.replyTo) return;
      let replyData;

      try {
        const replyDoc = await getDoc(doc(db, "tweets", tweet.replyTo.id));
        replyData = replyDoc.data();
        setTopReply(replyData);

        if (!replyData.replyTo) return;
      } catch (err) {
        if (err instanceof TypeError) {
          setTopReply("deleted");
          return;
        }
      }

      try {
        const secondReplyDoc = await getDoc(
          doc(db, "tweets", replyData.replyTo.id)
        );
        const secondReplyData = secondReplyDoc.data();
        setSecondTopReply(secondReplyData);
      } catch (err) {
        if (err instanceof TypeError) {
          setSecondTopReply("deleted");
        }
      }
    }

    async function getBottomReplies() {
      if (!tweet || tweet === "deleted" || !Object.keys(tweet.replies).length) {
        setBottomReplies([]);
        return;
      }
      let newBottomReplies = [];
      for (let tweetReply in tweet.replies) {
        const reply = tweet.replies[tweetReply];
        const replyDoc = await getDoc(doc(db, "tweets", reply.id));
        const replyData = replyDoc.data();
        newBottomReplies.push(replyData);
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

      {secondTopReply && topReply.replyTo ? (
        secondTopReply === "deleted" ? (
          <DeletedTweet />
        ) : (
          <Tweets
            tweets={[secondTopReply]}
            isReply={true}
            noBorder={true}
            noRetweet={true}
          />
        )
      ) : null}

      {topReply && tweet.replyTo ? (
        topReply === "deleted" ? (
          <DeletedTweet />
        ) : (
          <Tweets
            tweets={[topReply]}
            isReply={true}
            noBorder={true}
            noRetweet={true}
          />
        )
      ) : null}

      {tweet === "deleted" ? (
        <Navigate to="/notFound" />
      ) : (
        <Tweets tweets={[tweet]} big={true} noBorder={true} noRetweet={true} />
      )}

      {user ? <ReplyBox replyingTo={tweet} /> : null}

      {bottomReplies ? (
        <Tweets tweets={bottomReplies} noRetweet={true} />
      ) : null}
    </div>
  ) : (
    <div className="w-[600px] border-x-[1px] border-gray-200 border-solid grow-2 min-h-[99vh] max-w-[600px]">
      Loading...
    </div>
  );
}
