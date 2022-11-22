import Comments from "./Comments";
import Retweets from "./Retweets";
import Likes from "./Likes";
import Share from "./Share";

export default function Tweet(props) {
  return (
    <div className="px-4 py-2 border-b-[1px] border-gray-200 border-solid">
      <div className="flex ">
        <a href="/test">
          <div
            className={`profilepic rounded-full penguin`}
            alt="profile pic"
          />
        </a>
        <div>
          <div className="flex">
            <h3 className="font-bold">Username</h3>
            <p className="handle ml-1 text-gray-500">user</p>
          </div>
          <div>
            <p className="leading-snug break-words">
              Tweet text. There can be quite a lot of text in a tweet so I'm
              going to write a lot of things, that way I can have a good idea of
              what it looks like on the page.
            </p>
          </div>
          <div className="mt-3">
            <div className="max-w-md flex justify-between">
              <Comments />
              <Retweets />
              <Likes />
              <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
