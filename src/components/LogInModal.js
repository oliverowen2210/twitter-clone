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
      <div className="flex flex-col items-center bg-white relative rounded-xl h-[450px] w-[600px]">
        <div className="w-full flex">
          <button
            onClick={() => {
              modal.toggle(false);
            }}
            className="relative left-[10px]"
          >
            <svg
              className="w-[22px] fill-current text-black"
              viewBox="0 0 24 24"
            >
              <g>
                <path d={SVGs.cross.default} />
              </g>
            </svg>
          </button>

          <div className="grow justify-center flex">
            <Bird link={null} />
          </div>
          <div />
        </div>
        <div className="grow flex flex-col justify-start items-center justify-center min-w-[364px] max-w-[364px] px-[32px] pb-[48px] m-auto h-full">
          <h2 className="font-bold text-3xl my-[12px]">Sign in to Twitter</h2>
          <div className="w-full py-[12px]">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 transition-100 rounded"
            />
          </div>
          <div className="w-full py-[12px]">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              type={"password"}
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 transition-100 rounded"
            />
          </div>
          <div className="grow" />
          <button
            onClick={() => {
              props.loginFunc(email, password);
              modal.toggle(false);
            }}
            className="border-solid bg-black text-white w-full border-[1px] rounded-full border-gray-500 font-bold p-3"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
