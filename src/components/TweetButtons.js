import Replies from "./Replies";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function TweetButtons(props) {
  return (
    <div className={(props.big ? "flex flex-col items-center " : "") + "mt-3"}>
      {props.big ? (
        <div
          className={
            (props.big ? "border-t-[2px] border-gray-100 h-[48px] " : "") +
            "w-[95%] flex justify-center"
          }
        >
          replies retweets likes share
        </div>
      ) : null}

      <div
        className={
          (props.big
            ? "border-y-[2px] border-gray-100 h-[48px] justify-center "
            : "") + "w-[95%] flex"
        }
      >
        <div
          className={
            (props.big ? "gap-[115px] max-w-md " : "gap-[70px] w-[85%] ") +
            "flex justify-between"
          }
        >
          <Replies
            data={props.data}
            count={props.data.replies ? props.data.replies.length : null}
            big={props.big}
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
            big={props.big}
          />
          <Likes
            data={props.data}
            count={
              props.data.likes ? Object.keys(props.data.likes).length : null
            }
            highlight={props.userLiked}
            originalVisible={props.originalVisible}
            big={props.big}
          />
          <Share big={props.big} />
        </div>
      </div>
    </div>
  );
}
