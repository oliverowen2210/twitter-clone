import React, { useContext } from "react";

import { UserContext } from "./App";
import BannerElement from "./BannerElement";
import SVGs from "../images/SVGs";

export default function Profile() {
  const user = useContext(UserContext);
  return !!user ? (
    <BannerElement link={`/${user.handle}`} path={SVGs.person} name="Profile" />
  ) : null;
}
