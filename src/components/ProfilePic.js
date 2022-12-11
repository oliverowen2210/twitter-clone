import { Link } from "react-router-dom";

export default function ProfilePic(props) {
  return props.link ? (
    <Link to={`/${props.link}`} className={"relative z-10"}>
      <div
        className={`mr-[12px] w-[48px] h-[48px] bg-center bg-cover bg-no-repeat bg-[url("./images/penguin.png")] rounded-full`}
        alt="profile pic"
      />
    </Link>
  ) : (
    <div className="mr-[12px] w-[48px] h-[48px] bg-center bg-cover bg-no-repeat bg-[url('./images/penguin.png')] rounded-full" />
  );
}
