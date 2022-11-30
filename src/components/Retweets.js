import { useState, useContext, useEffect, useRef } from "react";
import {
  doc,
  getDoc,
  collection,
  deleteField,
  deleteDoc,
  updateDoc,
  setDoc,
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
    props.highlight || (user && !!user.retweets[props.data.id])
  );
  let locked = useRef(null);
  useEffect(() => {
    locked.current = false;
  });
  return (
    <TweetButton
      clickFunc={async () => {
        if (locked.current) return;
        if (!user) {
          setModal(true);
          return;
        }
        const dateRetweeted = new Date();

        locked.current = true;
        const userDocRef = doc(db, "users", user.uid);
        let originalTweetDocID = props.data.originalID
          ? props.data.originalID
          : props.data.id;
        const originalTweetDocRef = doc(db, "tweets", originalTweetDocID);
        const originalTweetDocSnap = await getDoc(originalTweetDocRef);

        let retweetID;

        if (!originalTweetDocSnap.data().retweets[user.uid]) {
          /**retweet */

          const retweetDoc = doc(collection(db, "tweets"));
          retweetID = retweetDoc.id;

          let retweetData = { ...props.data };
          retweetData.originalID = retweetData.originalID
            ? retweetData.originalID
            : retweetData.id;
          retweetData.id = retweetID;
          retweetData.retweetedBy = user.username;

          await setDoc(doc(db, "tweets", retweetID), retweetData);

          await updateDoc(userDocRef, {
            [`tweets.${retweetID}`]: {
              id: retweetData.id,
              originalID: retweetData.originalID,
              retweetedBy: user.username,
            },
            [`retweets.${props.data.id}`]: {
              retweetedOn: dateRetweeted,
              retweetID: retweetData.id,
              originalID: retweetData.originalID,
            },
          });

          await updateDoc(originalTweetDocRef, {
            [`retweets.${user.uid}`]: {
              retweetedOn: dateRetweeted,
              username: user.username,
              handle: user.handle,
              uid: user.uid,
              retweetID: retweetData.id,
            },
          });

          await setCount(count + 1);
          await setHighlight(true);

          /**reloads page to avoid having to link twinks to their retweets
           * and vice versa. maybe someday?
           */
          if (props.originalVisible) {
            window.location.reload();
          } else {
            locked.current = false;
          }
        } else {
          /** unretweet*/
          let retweetID = props.data.retweets[user.uid].retweetID;

          await updateDoc(userDocRef, {
            [`tweets.${retweetID}`]: deleteField(),
            [`retweets.${props.data.id}`]: deleteField(),
          });

          await updateDoc(originalTweetDocRef, {
            [`retweets.${user.uid}`]: deleteField(),
          });

          await deleteDoc(
            doc(db, "tweets", user.retweets[props.data.id].retweetID)
          );

          if (props.originalVisible) {
            window.location.reload();
          } else {
            locked.current = false;
          }
        }
      }}
      color="green-400"
      alt={highlight}
      path={SVGs.arrows}
      count={count}
    />
  );
}
