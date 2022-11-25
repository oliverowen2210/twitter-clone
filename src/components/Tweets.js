import Tweet from "./Tweet";

export default function Tweets(props) {
  return (
    <ul>
      {props.tweets.length
        ? props.tweets.map((tweet) => (
            <Tweet
              author={tweet.author}
              handle={tweet.handle}
              content={tweet.content}
              datePosted={tweet.datePosted}
              likes={tweet.likes}
              replies={tweet.replies}
              replyTo={tweet.replyTo}
              retweets={tweet.retweets}
              key={`${tweet.author} ${tweet.datePosted}`}
            />
          ))
        : null}
    </ul>
  );
}
