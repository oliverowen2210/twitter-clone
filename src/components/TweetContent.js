export default function TweetContent(props) {
  return (
    <div>
      <p
        className={(props.big ? "text-lg " : null) + "leading-snug break-words"}
      >
        {props.content}
      </p>
    </div>
  );
}
