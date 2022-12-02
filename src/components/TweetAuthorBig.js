import { Link } from "react-router-dom";

import ProfilePic from "./ProfilePic";

export default function TweetAuthorBig(props) {
  return (
    <Link to={`/${props.data.handle}`} className={"relative z-10 w-fit"}>
      <div className="flex">
        <ProfilePic />
        <div>
          <h3 className="font-bold hover:underline">{props.data.author}</h3>
          <p className="handle text-gray-500">{props.data.handle}</p>
        </div>
      </div>
    </Link>
  );
}
