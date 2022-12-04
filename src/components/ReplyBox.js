import { useState } from "react";

import ProfilePic from "./ProfilePic";

export default function ReplyBox(props) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex px-4 py-3 items-center">
      <ProfilePic />
      <input
        type="text"
        placeholder="Tweet your reply"
        className="text-lg grow placeholder-slate-500 focus:outline-0 cursor-text"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></input>
      <button
        className={
          (!inputValue
            ? "opacity-50 hover:cursor-default "
            : "hover:bg-red-600 ") +
          "bg-red-500 h-[34px] text-[14px] border-solid border-[1px] border-black text-white font-bold px-[16px] rounded-full"
        }
        onClick={() => {
          if (!inputValue) return;
          console.log("reply");
        }}
      >
        Reply
      </button>
    </div>
  );
}
