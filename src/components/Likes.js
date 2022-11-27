import { useContext } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { UserContext } from "./App";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Likes(props) {
  const user = useContext(UserContext);

  return (
    <TweetButton
      clickFunc={async () => {
        let tweetDocRef = doc();
      }}
      color="pink-500"
      path={SVGs.heart}
      count={props.count}
    />
  );
}
