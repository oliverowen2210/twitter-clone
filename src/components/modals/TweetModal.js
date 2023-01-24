import React, { useState, useContext } from "react";

import { UserContext, ModalsContext } from "../App";
import ProfilePic from "../ProfilePic";
import SVGs from "../../images/SVGs";

export default function TweetModal(props) {
  let user = useContext(UserContext);
  let modal = useContext(ModalsContext).tweet;
  let [inputValue, setInputValue] = useState("");

  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      />
      <div className="flex shrink flex-col items-center bg-white relative rounded-xl h-fit w-[600px] max-w-[600px]">
        <div className="h-[53px] w-full flex px-[16px]">
          <button
            className="min-w-[56px] min-h-[32px] text-2xl"
            onClick={() => {
              modal.toggle(false);
            }}
          >
            <svg className="w-[22px]" viewBox="0 0 24 24">
              <g>
                <path d={SVGs.cross.default} />
              </g>
            </svg>
          </button>
          <div className="grow" />
        </div>

        <div className="py-[4px] px-[16px] w-full flex">
          <div className="mr-[12px]">
            <ProfilePic />
          </div>
          <div>
            <textarea
              placeholder="What's happening?"
              cols={53}
              rows={4}
              className="resize-none outline-0 placeholder-gray-500 text-xl border-b-[1px] border-gray-100 "
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></textarea>
            <div className="w-full h-[48px] flex">
              <div className="grow" />
              <div>
                <button
                  onClick={() => {
                    if (!user || !inputValue) return;
                    props.tweetFunc(inputValue);
                  }}
                  className={
                    (!user || !inputValue
                      ? "opacity-50 hover:cursor-default "
                      : "hover:bg-red-600 ") +
                    "bg-red-500 text-white font-bold h-[36px] rounded-full"
                  }
                >
                  <span className="px-[16px] h-[36px]">Tweet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
