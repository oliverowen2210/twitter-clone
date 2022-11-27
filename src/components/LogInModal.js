import { useState, useEffect } from "react";
import SVGs from "../images/SVGs";

export default function LogInModal(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [savedURL, setSavedURL] = useState("");

  /**setting styles on HTML element to stop page from shifting around
   * and storing/setting page URL when toggling modal */
  useEffect(() => {
    if (props.open) {
      document.documentElement.style.overflowY = "hidden";
      document.documentElement.style.marginRight = "17px";
      if (!savedURL) setSavedURL(window.location.href);
      window.history.pushState({}, "", "/login");
    } else {
      document.documentElement.style.overflowY = "";
      document.documentElement.style.marginRight = "";
      window.history.pushState({}, "", savedURL);
      setSavedURL("");
    }
  }, [props.open, savedURL]);

  return props.open ? (
    <div className="bg-gray-800 bg-opacity-30 z-30 fixed t-0 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col pt-[24px] items-center bg-white relative rounded-xl h-[650px] w-[600px]">
        <button
          onClick={props.closeFunc}
          className="absolute top-[11px] left-[15px]"
        >
          <svg className="w-[22px] fill-current text-black" viewBox="0 0 24 24">
            <g>
              <path d={SVGs.cross} />
            </g>
          </svg>
        </button>
        <h2>Sign in to Twitter</h2>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <button
          onClick={() => {
            props.loginFunc(email, password);
            props.closeFunc();
          }}
          className="border-solid border-[1px] rounded-full border-gray-500 font-bold p-3"
        >
          Sign In
        </button>
      </div>
    </div>
  ) : null;
}
