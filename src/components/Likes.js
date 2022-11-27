import { useState, useContext } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

import { UserContext, DBContext, ModalContext } from "./App";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Likes(props) {
  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const setModal = useContext(ModalContext);

  const [count, setCount] = useState(props.count);
  return (
    <TweetButton
      clickFunc={async () => {
        if (!user) {
          setModal(true);
          return;
        }
        let dateLiked = new Date();
        let tweetDocRef = doc(db, "tweets", props.data.id);

        let tweetDocSnap = await getDoc(tweetDocRef);
        if (!!tweetDocSnap.data().likes) {
          if (!!tweetDocSnap.data().likes[user.uid]) console.log("unlike");
        } else {
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            likes: {
              [props.data.id]: { likedOn: dateLiked, id: props.data.id },
            },
          });
          await updateDoc(tweetDocRef, {
            likes: {
              [user.uid]: {
                likedOn: dateLiked,
                username: user.username,
                handle: user.handle,
                uid: user.uid,
              },
            },
          });
          setCount(props.count + 1);
        }
      }}
      color="pink-500"
      path={SVGs.heart}
      count={count}
    />
  );
}
