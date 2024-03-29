import React, { useRef, useEffect, useContext, useCallback } from "react";

import { UserContext, ModalsContext } from "./App";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function TweetExtras(props) {
  const user = useContext(UserContext);
  const modal = useContext(ModalsContext).tweetExtras;
  const login = useContext(ModalsContext).login;
  const ref = useRef(null);

  const updateModalRect = useCallback(() => {
    if (!ref.current) return;
    const boundingRect = ref.current.getBoundingClientRect();
    const left = boundingRect.left + 125;
    const top = boundingRect.top;
    modal.setPosition(left, top);
  }, [modal]);

  useEffect(() => {
    let timer;

    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(updateModalRect, 200);
    });
  }, [updateModalRect]);

  return (
    <div ref={ref}>
      <TweetButton
        color="blue-400"
        path={SVGs.dots}
        clickFunc={() => {
          if (!user || props.tweet.authorID !== user.uid) {
            if (!user) login.toggle(true);
            return;
          }
          modal.setTweet(props.tweet);
          modal.toggle(true);
          updateModalRect();
        }}
      />
    </div>
  );
}
