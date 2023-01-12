import React from "react";
import Signup from "./Signup";
import SearchBar from "./SearchBar";

export default function Sidebar(props) {
  return (
    <div className="pl-8 w-[350px]">
      {props.noBar ? null : <SearchBar />}
      {props.user ? null : <Signup />}
    </div>
  );
}
