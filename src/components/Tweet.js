import { Link } from "react-router-dom";

import Replies from "./Replies";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function Tweet(props) {
  return (
    <div
      className="cursor-pointer  relative duration-100 hover:bg-gray-100 block w-[600px] px-4 py-2 border-b-[1px] border-gray-200 border-solid"
      id={`${props.data.retweetID ? props.data.retweetID : props.data.id}`}
    >
      <div className="flex relative">
        <Link
          to={`/tweet/${props.data.id}`}
          className="absolute w-full h-full"
        />
        <Link to={`/${props.data.handle}`} className="relative z-10">
          <div
            className={`profilepic rounded-full penguin`}
            alt="profile pic"
          />
        </Link>
        <div className="w-full">
          <Link
            className="block flex w-fit relative z-10"
            to={`/${props.data.handle}`}
          >
            <h3 className="font-bold hover:underline">{props.data.author}</h3>
            <p className="handle ml-1 text-gray-500">{props.data.handle}</p>
          </Link>
          <div>
            <p className="leading-snug break-words">{props.data.content}</p>
          </div>
          <div className="mt-3">
            <div className="max-w-md flex justify-between">
              <Replies
                data={props.data}
                count={props.data.replies ? props.data.replies.length : null}
              />
              <Retweets
                data={props.data}
                count={
                  props.data.retweets
                    ? Object.keys(props.data.retweets).length
                    : null
                }
                highlight={props.retweeted}
                originalVisible={props.originalVisible}
              />
              <Likes
                data={props.data}
                count={
                  props.data.likes ? Object.keys(props.data.likes).length : null
                }
                highlight={props.liked}
                originalVisible={props.originalVisible}
              />
              <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
