import Tweet from "./Tweet";
import SVGs from "../images/SVGs";

export default function Tweets(props) {
  return (
    <div className="border-x-[1px] border-gray-200 border-solid">
      <div className="flex w-full h-[53px] max-w-[1000px] px-[16px] py-[6px]">
        <div className="bg-gray-200 rounded-l-full">
          <span className="flex items-center h-full pl-[12px] min-w-[32px]">
            <svg viewBox="0 0 24 24">
              <g>
                <path d={SVGs.glass} />
              </g>
            </svg>
          </span>
        </div>
        <input
          placeholder="Search Twitter"
          className="bg-gray-200 p-[12px] rounded-r-full cursor-text opacity-100 placeholder-black w-full text-black font-[15px]"
        ></input>
      </div>
      <Tweet />
      <Tweet />
    </div>
  );
}
