import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Comments(props) {
  return <TweetButton color="pink-500" path={SVGs.heart} count={props.count} />;
}
