import { Link } from "react-router-dom";

export default function ProfilePic(props) {
  return props.link ? (
    <Link to={`/${props.link}`} className={"relative z-10"}>
      <div className={`profilepic rounded-full penguin`} alt="profile pic" />
    </Link>
  ) : (
    <div className="profilepic rounded-full penguin" />
  );
}
