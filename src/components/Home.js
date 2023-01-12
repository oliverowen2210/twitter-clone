import React from "react";

import BannerElement from "./BannerElement";
import SVGs from "../images/SVGs";

export default function Home(props) {
  return <BannerElement link="/home" path={SVGs.house} name="Home" />;
}
