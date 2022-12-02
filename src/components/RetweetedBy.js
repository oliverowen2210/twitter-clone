import SVGs from "../images/SVGs";

export default function RetweetedBy(props) {
  return (
    <div className="flex">
      <svg viewBox="0 0 24 24" className="w-[16px] ml-[28px] mr-[16px]">
        <g>
          <path d={SVGs.arrows.default} />
        </g>
      </svg>
      {props.user &&
      ((!props.data.originalID && props.userRetweeted) ||
        props.data.retweetedBy === props.user.username) ? (
        <p className="font-bold text-sm">You retweeted</p>
      ) : (
        <p className="font-bold text-sm">{props.data.retweetedBy} retweeted</p>
      )}
    </div>
  );
}
