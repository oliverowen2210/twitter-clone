import Tweet from "./Tweet";

export default function Tweets(props) {
  return (
    <div className="border-x-[1px] border-gray-200 border-solid">
      <div>
        <input placeholder="Search Twitter"></input>
      </div>
      <Tweet />
      <Tweet />
    </div>
  );
}
