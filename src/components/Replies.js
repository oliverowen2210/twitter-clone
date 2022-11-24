import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Replies(props) {
  return (
    <TweetButton color="blue-400" path={SVGs.chatBubble} count={props.count} />
  );
}
