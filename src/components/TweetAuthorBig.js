import { Link } from "react-router-dom";

import ProfilePic from "./ProfilePic";
import TweetExtras from "./TweetExtras";

export default function TweetAuthorBig(props) {
  return (
    <div className={"relative z-10"}>
      <div className="flex">
        <Link to={`/${props.data.handle}`} className="flex">
          <ProfilePic />
          <div className="grow">
            <h3 className="font-bold hover:underline">{props.data.author}</h3>
            <p className="handle text-gray-500">{props.data.handle}</p>
          </div>
        </Link>
        <div className="grow"></div>
        <TweetExtras tweet={props.data} />
      </div>
    </div>
  );
}
