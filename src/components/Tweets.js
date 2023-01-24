import React, { useState, useEffect, useContext } from "react";
import { getDoc, doc } from "firebase/firestore";

import { UserContext, DBContext } from "./App";
import Tweet from "./Tweet";

export default function Tweets(props) {
  /**after running convertRetweetsToOriginals(), tweetList will hold an updated
   * version of props.tweets with retweets replaced by the original tweets*/
  let [tweetList, setTweetList] = useState([]);
  let [busy, setBusy] = useState(true);

  const user = useContext(UserContext);
  const db = useContext(DBContext);

  useEffect(() => {
    async function getTweet(id) {
      const docRef = doc(db, "tweets", id);
      const tweetDoc = await getDoc(docRef);
      return tweetDoc.data();
    }
    async function convertRetweetsToOriginals() {
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
      await setTweetList(copyTweetList);
      setBusy(false);
    }

    convertRetweetsToOriginals();
  }, [props.tweets, db]);

  return busy ? null : (
    <ul>
      {tweetList.length
        ? tweetList.map((tweet) => {
            let tweetData = {
              author: tweet.author,
              authorID: tweet.authorID,
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

            if (tweet.retweetedBy) {
              tweetData.retweetedBy = tweet.retweetedBy;
            }

            let userLiked = false;
            let userRetweeted = false;
            let originalVisible = tweet.originalVisible ? true : false;

            if (user) {
              if (tweetData.retweets[user.uid]) {
                userRetweeted = true;
              }
              if (tweetData.likes[user.uid]) {
                userLiked = true;
              }
            }

            return (
              <Tweet
                data={tweetData}
                key={`tweet ${tweetData.id}`}
                userLiked={userLiked}
                userRetweeted={userRetweeted}
                originalVisible={originalVisible}
                big={props.big}
                isReply={props.isReply}
                noBorder={props.noBorder}
                noRetweet={props.noRetweet}
              />
            );
          })
        : null}
    </ul>
  );
}
