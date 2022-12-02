import Replies from "./Replies";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function TweetButtons(props) {
  return (
    <div className="mt-3">
      <div className="max-w-md flex justify-between">
        <Replies
          data={props.data}
          count={props.data.replies ? props.data.replies.length : null}
        />
        <Retweets
          data={props.data}
          count={
            props.data.retweets ? Object.keys(props.data.retweets).length : null
          }
          highlight={props.userRetweeted}
          originalVisible={props.originalVisible}
        />
        <Likes
          data={props.data}
          count={props.data.likes ? Object.keys(props.data.likes).length : null}
          highlight={props.userLiked}
          originalVisible={props.originalVisible}
        />
        <Share />
      </div>
    </div>
  );
}
