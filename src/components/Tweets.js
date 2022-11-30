import { useState, useEffect, useContext } from "react";
import { getDoc, doc } from "firebase/firestore";

import { UserContext, DBContext } from "./App";
import Tweet from "./Tweet";
import uniqid from "uniqid";

export default function Tweets(props) {
  let [tweetList, setTweetList] = useState([]);

  const user = useContext(UserContext);
  const db = useContext(DBContext);

  useEffect(() => {
    async function getTweet(id) {
      const docRef = doc(db, "tweets", id);
      const tweetDoc = await getDoc(docRef);
      return tweetDoc.data();
    }
    async function updateRetweets() {
      let copyTweetList = [...props.tweets];
      for (let tweet of copyTweetList) {
        /** if tweets have an originalID, it means they're a retweet of that id */
        if (!!tweet.originalID) {
          /**check if original will be on screen*/
          for (let tweet2 of copyTweetList) {
            if (tweet2.id === tweet.originalID) {
              tweet.originalVisible = true;
              tweet2.originalVisible = true;
            }
          }
          const originalTweet = await getTweet(tweet.originalID);
          tweet.likes = originalTweet.likes;
          tweet.retweets = originalTweet.retweets;
          tweet.replies = originalTweet.replies;
        }
      }
      setTweetList(copyTweetList);
    }

    updateRetweets();
  }, [props.tweets, db]);

  return (
    <ul>
      {tweetList.length
        ? tweetList.map((tweet) => {
            let tweetData = {
              author: tweet.author,
              content: tweet.content,
              datePosted: tweet.datePosted,
              handle: tweet.handle,
              id: tweet.id,
              likes: tweet.likes,
              originalID: tweet.originalID,
              replies: tweet.replies,
              replyTo: tweet.replyTo,
              retweets: tweet.retweets,
            };

            let liked = false;
            let retweeted = false;
            let originalVisible = tweet.originalVisible ? true : false;
            if (tweet.retweetedBy) {
              tweetData.retweetedBy = tweet.retweetedBy;
              if (tweetData.retweetedBy === user.username) {
                retweeted = true;
              }
              if (tweetData.likes[user.uid]) {
                liked = true;
              }
            }

            return (
              <Tweet
                data={tweetData}
                key={uniqid()}
                liked={liked}
                retweeted={retweeted}
                originalVisible={originalVisible}
              />
            );
          })
        : null}
    </ul>
  );
}
