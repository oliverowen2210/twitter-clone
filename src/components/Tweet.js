import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "./App";
import SVGs from "../images/SVGs";
import Replies from "./Replies";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function Tweet(props) {
  const user = useContext(UserContext);
  return (
    <div
      className="cursor-pointer  relative duration-100 hover:bg-gray-100 block w-[600px] px-4 py-2 border-b-[1px] border-gray-200 border-solid"
      id={`${props.data.retweetID ? props.data.retweetID : props.data.id}`}
    >
      <div className="flex relative flex-col">
        <Link
          to={`/tweet/${props.data.id}`}
          className="absolute w-full h-full"
        />
        {!props.big && (props.userRetweeted || props.data.retweetedBy) ? (
          <div className="flex">
            <svg viewBox="0 0 24 24" className="w-[16px] ml-[28px] mr-[16px]">
              <g>
                <path d={SVGs.arrows.default} />
              </g>
            </svg>
            {user &&
            ((!props.data.originalID && props.userRetweeted) ||
              props.data.retweetedBy === user.username) ? (
              <p className="font-bold text-sm">You retweeted</p>
            ) : (
              <p className="font-bold text-sm">
                {props.data.retweetedBy} retweeted
              </p>
            )}
          </div>
        ) : null}
        {props.big ? (
          /**big tweet */
          <div>
            <Link to={`/${props.data.handle}`} className={"relative z-10"}>
              <div className="flex">
                <div
                  className={`profilepic rounded-full penguin`}
                  alt="profile pic"
                />
                <div>
                  {" "}
                  <h3 className="font-bold hover:underline">
                    {props.data.author}
                  </h3>
                  <p className="handle text-gray-500">{props.data.handle}</p>
                </div>
              </div>
            </Link>
            <div>
              <p className="leading-snug break-words text-lg">
                {props.data.content}
              </p>
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
                  highlight={props.userRetweeted}
                  originalVisible={props.originalVisible}
                />
                <Likes
                  data={props.data}
                  count={
                    props.data.likes
                      ? Object.keys(props.data.likes).length
                      : null
                  }
                  highlight={props.userLiked}
                  originalVisible={props.originalVisible}
                />
                <Share />
              </div>
            </div>
          </div>
        ) : (
          /**small tweet */
          <div className="flex">
            <Link to={`/${props.data.handle}`} className={"relative z-10"}>
              <div
                className={`profilepic rounded-full penguin`}
                alt="profile pic"
              />
            </Link>
            <div className="w-full">
              <Link
                className={"block flex w-fit relative z-10"}
                to={`/${props.data.handle}`}
              >
                <h3 className="font-bold hover:underline">
                  {props.data.author}
                </h3>
                <p className="handle ml-1 text-gray-500">{props.data.handle}</p>
              </Link>
              <div>
                <p className="leading-snug break-words">{props.data.content}</p>
              </div>
              <div className="mt-3">
                <div className="max-w-md flex justify-between">
                  <Replies
                    data={props.data}
                    count={
                      props.data.replies ? props.data.replies.length : null
                    }
                  />
                  <Retweets
                    data={props.data}
                    count={
                      props.data.retweets
                        ? Object.keys(props.data.retweets).length
                        : null
                    }
                    highlight={props.userRetweeted}
                    originalVisible={props.originalVisible}
                  />
                  <Likes
                    data={props.data}
                    count={
                      props.data.likes
                        ? Object.keys(props.data.likes).length
                        : null
                    }
                    highlight={props.userLiked}
                    originalVisible={props.originalVisible}
                  />
                  <Share />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
