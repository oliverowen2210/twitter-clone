import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-[600px] lg:w-[920px] xl:w-[990px] flex grow justify-center">
      <div className="flex flex-col items-center p-[24px] mt-[40px]">
        <div>
          Hmm...this page doesn’t exist. Try searching for something else.
        </div>
        <Link to="/explore">
          <button className="hover:bg-red-600 mt-[32px] bg-red-500 border-solid border-[1px] border-black text-white font-bold px-[16px] py-[8px] rounded-full">
            Search
          </button>
        </Link>
      </div>
    </div>
  );
}
