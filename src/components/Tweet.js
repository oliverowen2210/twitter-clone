import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "./App";
import RetweetedBy from "./RetweetedBy";
import TweetAuthorBig from "./TweetAuthorBig";
import TweetContent from "./TweetContent";
import TweetButtons from "./TweetButtons";
import ProfilePic from "./ProfilePic";

export default function Tweet(props) {
  const user = useContext(UserContext);
  return (
    <div
      className={
        (props.big ? "" : "cursor-pointer ") +
        "relative duration-100 hover:bg-gray-100 block w-[600px] px-4 py-2 border-b-[1px] border-gray-200 border-solid"
      }
      id={`${props.data.retweetID ? props.data.retweetID : props.data.id}`}
    >
      <div className="flex relative flex-col">
        {props.big ? null : (
          <Link
            to={`/tweet/${props.data.id}`}
            className="absolute w-full h-full"
          />
        )}
        {!props.big && (props.userRetweeted || props.data.retweetedBy) ? (
          <RetweetedBy
            user={user}
            data={props.data}
            retweetedBy={props.retweetedBy}
          />
        ) : null}
        {props.big ? (
          /**big tweet */
          <div>
            <div className="flex flex-col">
              <TweetAuthorBig data={props.data} />
              <TweetContent content={props.data.content} />
            </div>
            <TweetButtons data={props.data} />
          </div>
        ) : (
          /**small tweet */
          <div className="flex">
            <ProfilePic link={`/${props.data.handle}`} />
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
              <TweetContent content={props.data.content} />
              <TweetButtons data={props.data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
