import { useState, useContext, useEffect } from "react";
import { doc, getDoc, deleteField, updateDoc } from "firebase/firestore";

import { UserContext, DBContext, ModalContext } from "./App";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Likes(props) {
  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const setModal = useContext(ModalContext);

  const [count, setCount] = useState(props.count);
  const [highlight, setHighlight] = useState(
    user && user.uid && !!props.data.likes[user.uid]
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
        const dateLiked = new Date();

        locked = true;
        const userDocRef = doc(db, "users", user.uid);
        const tweetDocRef = doc(db, "tweets", props.data.id);

        const tweetDocSnap = await getDoc(tweetDocRef);
        /** check if tweet has likes and if user already liked it */

        if (
          !Object.keys(tweetDocSnap.data().likes).length ||
          !tweetDocSnap.data().likes[user.uid]
        ) {
          /**like */
          await updateDoc(userDocRef, {
            [`likes.${props.data.id}`]: {
              likedOn: dateLiked,
              id: props.data.id,
            },
          });
          await updateDoc(tweetDocRef, {
            [`likes.${user.uid}`]: {
              likedOn: dateLiked,
              username: user.username,
              handle: user.handle,
              uid: user.uid,
            },
          });
          await setCount(count + 1);
          await setHighlight(true);
          locked = false;
        } else {
          /** unlike */
          await updateDoc(userDocRef, {
            [`likes.${props.data.id}`]: deleteField(),
          });

          await updateDoc(tweetDocRef, {
            [`likes.${user.uid}`]: deleteField(),
          });

          /**update counter without refreshing page */
          await setCount(count - 1);
          await setHighlight(false);
          locked = false;
        }
      }}
      color="pink-500"
      bgcolor="pink-500"
      alt={highlight}
      path={SVGs.heart}
      count={count}
    />
  );
}
