export default function TweetButton(props) {
  return (
    <button
      onClick={props.clickFunc}
      className="group flex items-center z-20 p-1 rounded-full min-h-[20px] leading-[0px]"
    >
      <div>
        <svg
          viewBox="0 0 24 24"
          className={
            (props.big ? "w-[19px] " : "w-4 ") +
            (props.alt
              ? `text-${props.color} `
              : `text-gray-500 group-hover:text-${props.color} `) +
            "fill-current duration-200 "
          }
        >
          <g>
            <path d={props.alt ? [props.path.alt] : [props.path.default]} />
          </g>
        </svg>
      </div>
      <p
        className={
          (props.alt
            ? `text-${props.color}`
            : `text-gray-500 group-hover:text-${props.color}`) +
          " px-2  duration-200"
        }
      >
        {!props.big && props.count ? props.count : null}
      </p>
    </button>
  );
}
