import { useContext } from "react";
import { UserContext } from "./App";

import Bird from "./Bird";
import Home from "./Home";
import Explore from "./Explore";
import Profile from "./Profile";
import UserInfo from "./UserInfo";

export default function Sidebar(props) {
  const user = useContext(UserContext);
  return (
    <div className="flex flex-col items-end grow">
      <div className="w-[275px]">
        <div className="flex flex-col w-[88px] xl:w-[275px] h-full px-[12px] fixed top-[0px]">
          <Bird link={user ? "/home" : "/explore"} />
          <Home />
          <Explore />
          <Profile />
          {user ? <UserInfo logoutFunc={props.logoutFunc} /> : null}
        </div>
      </div>
    </div>
  );
}
