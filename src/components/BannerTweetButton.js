import React, { useContext } from "react";

import { ModalsContext } from "./App";
import SVGs from "../images/SVGs";

export default function BannerTweetButton() {
  let modal = useContext(ModalsContext).tweet;

  return (
    <button
      onClick={() => {
        modal.toggle(true);
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-[52px] xl:w-[225px] h-[52px] xl:h-auto py-[8px] rounded-full relative left-[12px]"
    >
      <p className="hidden xl:inline">Tweet</p>
      <svg
        viewBox="0 0 24 24"
        className="inline xl:hidden w-[24px] fill-current"
      >
        <g>
          <path d={SVGs.feather.default} />
        </g>
      </svg>
    </button>
  );
}
