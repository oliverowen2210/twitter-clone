import Tweet from "./Tweet";

export default function Tweets(props) {
  return (
    <ul>
      {props.tweets.length
        ? props.tweets.map((tweet) => (
            <Tweet
              data={{
                author: tweet.author,
                content: tweet.content,
                datePosted: tweet.datePosted,
                handle: tweet.handle,
                id: tweet.id,
                likes: tweet.likes,
                originalID: tweet.originalID,
                replies: tweet.replies,
                replyTo: tweet.replyTo,
                retweets: tweet.retweets,
              }}
              key={`${tweet.id} ${tweet.datePosted}`}
            />
          ))
        : null}
    </ul>
  );
}
