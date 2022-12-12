import { Link } from "react-router-dom";

export default function ProfilePicBig(props) {
  return props.link ? (
    <Link to={`/${props.link}`} className={"relative z-10"}>
      <div
        className={`absolute bg-center bg-cover bg-no-repeat bg-[url("./images/penguin.png")] rounded-full w-[133.5px] h-[133.5px]`}
        alt="profile pic"
      />
    </Link>
  ) : (
    <div className="flex items-center justify-center absolute w-[140px] h-[140px] bg-white rounded-full">
      <div className="bg-center bg-cover bg-no-repeat bg-[url('./images/penguin.png')] rounded-full w-[133.5px] h-[133.5px]" />
    </div>
  );
}
