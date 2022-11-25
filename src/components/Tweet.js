import Replies from "./Replies";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function Tweet(props) {
  return (
    <div className="px-4 py-2 border-b-[1px] border-gray-200 border-solid">
      <div className="flex ">
        <a href="/test">
          <div
            className={`profilepic rounded-full penguin`}
            alt="profile pic"
          />
        </a>
        <div className="w-full">
          <div className="flex">
            <h3 className="font-bold">{props.author}</h3>
            <p className="handle ml-1 text-gray-500">{props.handle}</p>
          </div>
          <div>
            <p className="leading-snug break-words">{props.content}</p>
          </div>
          <div className="mt-3">
            <div className="max-w-md flex justify-between">
              <Replies count={props.replies.length} />
              <Retweets count={props.retweets.length} />
              <Likes count={props.likes.length} />
              <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
