import { useContext } from "react";
import { UserContext } from "./App";

import Signup from "./Signup";
import SearchBar from "./SearchBar";

export default function Sidebar(props) {
  const user = useContext(UserContext);
  return (
    <div className="pl-8 w-[350px]">
      {window.location.pathname === "/explore" ||
      (!user && window.location.pathname === "/") ? null : (
        <SearchBar />
      )}
      <Signup />
    </div>
  );
}
