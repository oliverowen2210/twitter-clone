import React, { useContext } from "react";

import { UserContext, LayersContext } from "../App";
import SVGs from "../../images/SVGs";

export default function TweetExtrasModal(props) {
  const user = useContext(UserContext);
  const modal = useContext(LayersContext).tweetExtras;

  async function handleDelete() {
    await props.deleteFunc(modal.tweet);
    window.location.reload();
  }

  return modal.show ? (
    <div className="z-[100] fixed w-screen h-screen">
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      />
      <div
        className="flex fixed shadow-[0_0_4px_0_gray] bg-white h-fit shadow-md border-gray-400 w-[200px] min-w-[225px] max-w-[375px]"
        style={{
          left: `${modal.position.left - 335}px`,
          top: `${modal.position.top}px`,
        }}
      >
        {modal.tweet.authorID === user.uid ? (
          <button
            onClick={() => {
              handleDelete();
            }}
            className="flex items-center text-red-500 font-bold w-full p-2 duration-200 hover:bg-gray-200 text-left"
          >
            <svg viewBox="0 0 24 24" className="w-[20px] fill-current">
              <g>
                <path d={SVGs.trashcan.default} />
              </g>
            </svg>
            <p className="ml-[12px]">Delete</p>
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
}
