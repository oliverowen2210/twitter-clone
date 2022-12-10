import { useNavigate } from "react-router-dom";

import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Replies(props) {
  const navigate = useNavigate();
  return (
    <TweetButton
      clickFunc={() => {
        navigate(`/tweet/${props.data.id}`);
      }}
      color="blue-400"
      path={SVGs.chatBubble}
      count={props.count}
      big={props.big}
    />
  );
}
