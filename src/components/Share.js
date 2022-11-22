import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Comments(props) {
  return <TweetButton color="blue-500" path={SVGs.share} count={props.count} />;
}
