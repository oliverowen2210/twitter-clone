export default function TweetButton(props) {
  return (
    <button onClick={props.clickFunc} className="group flex items-center z-20">
      <div>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 text-gray-500 fill-current duration-200  group-hover:text-${props.color}`}
        >
          <g>
            <path d={props.path} />
          </g>
        </svg>
      </div>
      <p
        className={`px-2 text-gray-500 duration-200 group-hover:text-${props.color}`}
      >
        {props.count ? props.count : null}
      </p>
    </button>
  );
}
