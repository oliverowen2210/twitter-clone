import { useRef, useContext } from "react";

import { LayersContext } from "./App";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function TweetExtras(props) {
  const popup = useContext(LayersContext).tweetExtras;
  const ref = useRef();

  /**todo: figure out how to update position without refs? */
  function updatePopupRect() {
    const boundingRect = ref.current.getBoundingClientRect();
    const left = boundingRect.left;
    const bottom = boundingRect.height;
    popup.setPosition(left, bottom);
  }
  return (
    <TweetButton
      color="blue-400"
      path={SVGs.dots}
      clickFunc={() => {
        popup.setTweet(props.tweet);
        popup.toggle(true);
      }}
      innerRef={ref}
    />
  );
}
