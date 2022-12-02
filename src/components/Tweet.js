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
        (props.isReply || props.data.replyTo ? "" : "border-b-[1px] py-2 ") +
        "relative duration-100 hover:bg-gray-100 block w-[600px] px-4 border-gray-200 border-solid"
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
            userRetweeted={props.userRetweeted}
          />
        ) : null}
        {props.big ? (
          /**big tweet */
          <div>
            <div className="flex flex-col">
              {props.data.replyTo ? (
                <div className="w-full flex">
                  <div className="h-[8px] flex basis-[48px] justify-center relative bottom-[8px]">
                    <div className="w-[2px] bg-gray-400"></div>
                  </div>
                </div>
              ) : null}
              <TweetAuthorBig data={props.data} />
              <TweetContent content={props.data.content} />
            </div>
            <TweetButtons
              data={props.data}
              userRetweeted={props.userRetweeted}
              userLiked={props.userLiked}
              originalVisible={props.originalVisible}
            />
          </div>
        ) : (
          /**small tweet */
          <div className="flex">
            <div>
              <ProfilePic link={`/${props.data.handle}`} />
              {props.isReply ? (
                <div className="w-full flex flex-col">
                  <div className="h-[8px] flex basis-[48px] justify-center relative bottom-[8px] right-[6px]">
                    <div className="w-[2px] bg-gray-400"></div>
                  </div>
                </div>
              ) : null}
            </div>
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
              <TweetButtons
                data={props.data}
                userRetweeted={props.userRetweeted}
                userLiked={props.userLiked}
                originalVisible={props.originalVisible}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
