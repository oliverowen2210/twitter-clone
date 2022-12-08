import { useContext } from "react";

import { UserContext, LayersContext } from "./App";

export default function TweetExtrasModal(props) {
  let user = useContext(UserContext);
  let modal = useContext(LayersContext).tweetExtras;

  return modal.show ? (
    <div className="z-[100] fixed w-screen h-screen">
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      />
      <div
        className="fixed transition-1000 bg-white h-fit shadow-md border-gray-400 w-[335px] min-w-[225px] max-w-[375px]"
        style={{
          left: `${modal.position.left - 335}px`,
          top: `${modal.position.top}px`,
        }}
      >
        {modal.tweet.authorID === user.uid ? (
          <button
            onClick={() => {
              props.deleteFunc(modal.tweet);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
}