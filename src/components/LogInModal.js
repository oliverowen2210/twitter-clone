import { useState, useEffect, useContext } from "react";
import Bird from "./Bird";
import SVGs from "../images/SVGs";
import { LayersContext } from "./App";

export default function LogInModal(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [savedURL, setSavedURL] = useState("");
  let modal = useContext(LayersContext).login;

  /**setting styles on HTML element to stop page from shifting around
   * and storing/setting page URL when toggling modal */
  useEffect(() => {
    if (modal.show) {
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
  }, [modal.show, savedURL]);

  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      <div
        className="w-full h-full absolute top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      ></div>
      <div className="flex flex-col pt-[24px] items-center bg-white relative rounded-xl h-[650px] w-[600px]">
        <Bird link={null} />
        <button
          onClick={() => {
            modal.toggle(false);
          }}
          className="absolute top-[11px] left-[15px]"
        >
          <svg className="w-[22px] fill-current text-black" viewBox="0 0 24 24">
            <g>
              <path d={SVGs.cross.default} />
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
            modal.toggle(false);
          }}
          className="border-solid border-[1px] rounded-full border-gray-500 font-bold p-3"
        >
          Sign In
        </button>
      </div>
    </div>
  ) : null;
}
