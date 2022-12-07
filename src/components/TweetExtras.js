import React, { useState } from "react";

import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function TweetExtras(props) {
  let [showPopup, setShowPopup] = useState(false);

  return (
    <div className="z-30 relative">
      {/**screen cover when popup is active */}
      <div
        className={
          (showPopup ? "absolute " : "hidden ") +
          "z-100 top-0 left-0 w-full h-full"
        }
        onClick={() => {
          console.log("wat");
          setShowPopup(false);
        }}
      />

      <TweetButton
        color="blue-400"
        path={SVGs.dots}
        clickFunc={() => {
          setShowPopup(true);
        }}
      />

      {/**popup box */}
      <div
        className={
          (showPopup ? "" : "hidden ") +
          `z-50 absolute transition-1000 bg-white h-[200px] shadow-md border-gray-400 w-[300px] min-w-[225px] max-w-[375px]`
        }
        style={{
          top: 0,
          right: 0,
        }}
      >
        Delete
      </div>
    </div>
  );
}
