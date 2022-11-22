export default function TweetButton(props) {
  return (
    <button className="group flex items-center">
      <div>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 text-gray-500 duration-300  group-hover:text-${props.color}`}
          style={{ fill: "currentcolor" }}
        >
          <g>
            <path d={props.path} />
          </g>
        </svg>
      </div>
      <p
        className={`px-2 text-gray-500 duration-300 group-hover:text-${props.color}`}
      >
        {props.count ? props.count : 137}
      </p>
    </button>
  );
}
