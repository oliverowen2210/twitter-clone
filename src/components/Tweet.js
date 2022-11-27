import { Link } from "react-router-dom";

import Replies from "./Replies";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function Tweet(props) {
  return (
    <Link
      to="/tweet/123"
      className="duration-100 hover:bg-gray-100 block w-[600px] px-4 py-2 border-b-[1px] border-gray-200 border-solid"
    >
      <div className="flex ">
        <Link to={`/${props.handle}`}>
          <div
            className={`profilepic rounded-full penguin`}
            alt="profile pic"
          />
        </Link>
        <div className="w-full">
          <Link className="block flex w-fit" to={`/${props.handle}`}>
            <h3 className="font-bold">{props.author}</h3>
            <p className="handle ml-1 text-gray-500">{props.handle}</p>
          </Link>
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
    </Link>
  );
}
