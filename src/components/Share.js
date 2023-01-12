import React from "react";
import TweetButton from "./TweetButton";
import SVGs from "../images/SVGs";

export default function Share(props) {
  return <TweetButton color="blue-400" path={SVGs.share} big={props.big} />;
}
