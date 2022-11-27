import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import Tweet from "./Tweet";

export default function TweetPage(props) {
  let tweetId = useParams().tweetID;
  let [tweet, setTweet] = useState(null);

  useEffect(() => {
    async function getTweet() {
      if (tweet) return;
      await getDoc(doc(props.db, "tweets", tweetId));
    }
  });
  return <div></div>;
}
