import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "./App";
import RetweetedBy from "./RetweetedBy";
import TweetAuthorBig from "./TweetAuthorBig";
import TweetContent from "./TweetContent";
import TweetButtons from "./TweetButtons";
import TweetExtras from "./TweetExtras";
import ProfilePic from "./ProfilePic";

export default function Tweet(props) {
  const user = useContext(UserContext);

  return (
    <div
      className={
        (props.big ? "" : "cursor-pointer hover:bg-gray-100 ") +
        (props.isReply || props.noBorder ? "" : "border-b-[1px] py-2 ") +
        "relative duration-100 block w-[600px] px-4 border-gray-200 border-solid"
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
        {!props.noRetweet &&
        !props.big &&
        (props.userRetweeted || props.data.retweetedBy) ? (
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
                  {/** Gray bar above PFP that shows tweet is a reply */}
                  <div className="h-[8px] flex basis-[48px] justify-center relative bottom-[8px]">
                    <div className="w-[2px] bg-gray-300 z-30 -mb-[4px]"></div>
                  </div>
                </div>
              ) : null}
              <TweetAuthorBig data={props.data} />
              {/** "replying to" text */}
              {props.data.replyTo != null ? (
                <div className="py-[8px] px-[6px]">
                  <p className=" text-[15px] text-gray-500">
                    Replying to{" "}
                    <span className="text-blue-400 ">
                      @{props.data.replyTo.handle}
                    </span>
                  </p>
                </div>
              ) : null}
              <TweetContent content={props.data.content} big={true} />
            </div>
            <TweetButtons
              data={props.data}
              userRetweeted={props.userRetweeted}
              userLiked={props.userLiked}
              originalVisible={props.originalVisible}
              big={true}
            />
          </div>
        ) : (
          /**small tweet */
          <div className="flex">
            <div>
              <ProfilePic
                link={`/${props.data.handle}`}
                id={props.data.authorID}
              />
              {props.isReply ? (
                <div className="w-full flex flex-col">
                  {/** Gray bar above PFP that shows tweet is a reply */}
                  <div className="h-[8px] flex basis-[48px] justify-center relative bottom-[8px] right-[6px]">
                    <div className="w-[2px] bg-gray-300 -mb-[4px] z-30"></div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-full">
              {/** name, handle and extras button */}
              <div className="flex">
                <Link
                  className={"block flex relative z-10"}
                  to={`/${props.data.handle}`}
                >
                  <h3 className="font-bold hover:underline">
                    {props.data.author}
                  </h3>
                </Link>
                <p className="handle ml-1 text-gray-500">{props.data.handle}</p>
                <div className="grow" />
                <TweetExtras tweet={props.data} />
              </div>
              {/** "replying to" text */}
              {props.data.replyTo != null ? (
                <div>
                  <p className=" text-[15px] text-gray-500">
                    Replying to{" "}
                    <span className="text-blue-400 ">
                      @{props.data.replyTo.handle}
                    </span>
                  </p>
                </div>
              ) : null}
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
