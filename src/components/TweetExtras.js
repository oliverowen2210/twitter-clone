import { useRef, useEffect, useContext, useCallback } from "react";

import { UserContext, LayersContext } from "./App";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function TweetExtras(props) {
  const user = useContext(UserContext);
  const popup = useContext(LayersContext).tweetExtras;
  const login = useContext(LayersContext).login;
  const ref = useRef();

  const updatePopupRect = useCallback(() => {
    const boundingRect = ref.current.getBoundingClientRect();
    const left = boundingRect.left + 16;
    const top = boundingRect.top;
    popup.setPosition(left, top);
  }, [popup]);

  useEffect(() => {
    let timer;

    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(updatePopupRect, 100);
    });
  }, [updatePopupRect]);

  return (
    <div ref={ref}>
      <TweetButton
        color="blue-400"
        path={SVGs.dots}
        clickFunc={() => {
          if (!user) {
            login.toggle(true);
            return;
          }
          popup.setTweet(props.tweet);
          popup.toggle(true);
          updatePopupRect();
        }}
      />
    </div>
  );
}
