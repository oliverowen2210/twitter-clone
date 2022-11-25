import HomeButton from "./HomeButton";
import Explore from "./Explore";
import UserInfo from "./UserInfo";

export default function Sidebar(props) {
  return (
    <div className="flex flex-col items-end grow">
      <div className="flex flex-col w-[275px] h-full px-[12px]">
        <HomeButton />
        <Explore />

        {props.user ? <UserInfo user={props.user} /> : null}
      </div>
    </div>
  );
}
