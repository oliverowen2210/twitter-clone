import { useState, useContext, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";

import { UserContext, DBContext, ModalContext } from "./App";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Retweets(props) {
  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const setModal = useContext(ModalContext);

  const [count, setCount] = useState(props.count);
  const [highlight, setHighlight] = useState(
    user &&
      user.uid &&
      (!!user.tweets[props.data.id] || !!user.tweets[`${props.data.id}-r`])
  );
  let locked;
  useEffect(() => {
    locked = false;
  });
  return (
    <TweetButton
      clickFunc={async () => {
        if (locked) return;
        if (!user) {
          setModal(true);
          return;
        }
        const dateRetweeted = new Date();

        locked = true;
        const userDocRef = doc(db, "users", user.uid);
        const tweetDocRef = doc(db, "tweets", props.data.id);
        const tweetDocSnap = await getDoc(tweetDocRef);

        let retweetID = `${props.data.id}-r`;
        const retweetDocRef = doc(db, "tweets", retweetID);

        if (!tweetDocSnap.data().retweets[user.uid]) {
          /**retweet */

          await updateDoc(userDocRef, {
            [`tweets.${retweetID}`]: {
              retweet: true,
              datePosted: dateRetweeted,
              id: `${props.data.id}`,
            },
          });
          await updateDoc(tweetDocRef, {
            [`retweets.${user.uid}`]: {
              retweetedOn: dateRetweeted,
              username: user.username,
              handle: user.handle,
              uid: user.uid,
            },
          });
          let retweetData = { ...props.data };
          retweetData.originalID = retweetData.id;
          retweetData.id = retweetID;
          await setDoc(retweetDocRef, retweetData);
          await setCount(count + 1);
          await setHighlight(true);
          locked = false;
        } else {
          /** unretweet*/
          await updateDoc(userDocRef, {
            [`tweets.${retweetID}`]: deleteField(),
          });

          await updateDoc(tweetDocRef, {
            [`retweets.${user.uid}`]: deleteField(),
          });
          await deleteDoc(retweetDocRef);

          /**update counter without refreshing page */
          await setCount(count - 1);
          await setHighlight(false);
          locked = false;
        }
      }}
      color="green-400"
      alt={highlight}
      path={SVGs.arrows}
      count={count}
    />
  );
}
