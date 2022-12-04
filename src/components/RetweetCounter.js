export default function RetweetCounter(props) {
  return props.retweets && Object.keys(props.retweets).length ? (
    <div>
      <p className="text-gray-600">
        <strong className="text-black">
          {Object.keys(props.retweets).length}{" "}
        </strong>
        Retweets
      </p>
    </div>
  ) : null;
}
