import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Retweets(props) {
  return (
    <TweetButton color="green-400" path={SVGs.arrows} count={props.count} />
  );
}
