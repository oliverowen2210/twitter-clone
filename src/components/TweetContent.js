export default function TweetContent(props) {
  return (
    <div>
      <p
        className={
          (props.big ? "text-xl " : "text-[15px] ") + "leading-snug break-words"
        }
      >
        {props.content}
      </p>
    </div>
  );
}
