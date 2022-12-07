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
        className="fixed transition-1000 bg-white h-[200px] shadow-md border-gray-400 w-[300px] min-w-[225px] max-w-[375px]"
        style={{
          bottom: `${modal.position.bottom + 20}px`,
          left: `${modal.position.left}px`,
        }}
      >
        {modal.tweet.id === user.uid ? <button>Delete</button> : null}
        <p>{modal.position.left}</p>
        <p>{modal.position.bottom}</p>
      </div>
    </div>
  ) : null;
}
