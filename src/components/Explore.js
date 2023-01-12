import React from "react";

import BannerElement from "./BannerElement";
import SVGs from "../images/SVGs";

export default function Explore() {
  return <BannerElement link="/explore" path={SVGs.hashtag} name="Explore" />;
}
