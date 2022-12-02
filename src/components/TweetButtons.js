import Replies from "./Replies";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function TweetButtons(props) {
  return (
    <div
      className={
        (props.big
          ? "flex justify-center border-y-[1px] border-gray-50 "
          : "") + "mt-3"
      }
    >
      <div className="max-w-md flex justify-between gap-[85px]">
        <Replies
          data={props.data}
          count={props.data.replies ? props.data.replies.length : null}
          big={props.big}
        />
        <Retweets
          data={props.data}
          count={
            props.data.retweets ? Object.keys(props.data.retweets).length : null
          }
          highlight={props.userRetweeted}
          originalVisible={props.originalVisible}
          big={props.big}
        />
        <Likes
          data={props.data}
          count={props.data.likes ? Object.keys(props.data.likes).length : null}
          highlight={props.userLiked}
          originalVisible={props.originalVisible}
          big={props.big}
        />
        <Share big={props.big} />
      </div>
    </div>
  );
}
