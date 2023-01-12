import React, { useState, useEffect, useRef, useContext } from "react";

import { UserContext, TweetContext } from "./App";
import ProfilePic from "./ProfilePic";

export default function ReplyBox(props) {
  const user = useContext(UserContext);
  const tweet = useContext(TweetContext);

  const [inputValue, setInputValue] = useState("");

  let locked = useRef(null);

  async function handleTweetReply(event) {
    if (event) event.preventDefault();
    if (!inputValue || !!locked.current) return;
    locked.current = true;
    await tweet(inputValue, props.replyingTo);
  }

  useEffect(() => {
    locked.current = false;
  });

  return (
    <div className="flex px-4 py-3 items-center border-gray-100 border-b-[1px]">
      <ProfilePic id={user.uid} />
      <textarea
        placeholder="Tweet your reply"
        className="text-lg grow placeholder-slate-500 focus:outline-0 cursor-text resize-none"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
      ></textarea>
      <button
        className={
          (!inputValue || locked.current
            ? "opacity-50 hover:cursor-default "
            : "hover:bg-red-600 ") +
          "bg-red-500 h-[34px] text-[14px] border-solid border-[1px] border-black text-white font-bold px-[16px] rounded-full"
        }
        onClick={(e) => {
          handleTweetReply(e);
        }}
      >
        Reply
      </button>
    </div>
  );
}
