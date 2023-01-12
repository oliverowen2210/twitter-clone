import React from "react";
import SVGs from "../images/SVGs";
import BannerElement from "./BannerElement";

export default function Bird(props) {
  return (
    <BannerElement
      class="bird"
      path={SVGs.bird}
      link={props.link}
      color="red-500"
    />
  );
}
