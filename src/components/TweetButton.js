export default function TweetButton(props) {
  return (
    <button
      onClick={props.clickFunc}
      className="relative group flex items-center z-20 py-1 rounded-full min-h-[20px] leading-[0px]"
      ref={props.innerRef ? props.innerRef : null}
    >
      <div>
        <svg
          viewBox="0 0 24 24"
          className={
            (props.big ? "w-5 " : "w-4 ") +
            (props.alt
              ? `text-${props.color} `
              : `text-gray-700 group-hover:text-${props.color} `) +
            "fill-current duration-200 "
          }
        >
          <g>
            <path d={props.alt ? [props.path.alt] : [props.path.default]} />
          </g>
        </svg>
      </div>
      {!props.big ? (
        <p
          className={
            (props.alt
              ? `text-${props.color}`
              : `text-gray-500 group-hover:text-${props.color}`) +
            " px-2  duration-200"
          }
        >
          {props.count ? props.count : null}
        </p>
      ) : null}
    </button>
  );
}
