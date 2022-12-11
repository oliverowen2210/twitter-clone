import { useState, useEffect, useContext } from "react";
import SVGs from "../images/SVGs";
import { LayersContext } from "./App";

export default function SignUpModal(props) {
  let [username, setUsername] = useState("");
  let [handle, setHandle] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [birthdate, setBirthdate] = useState("");
  let [savedURL, setSavedURL] = useState("");
  let modal = useContext(LayersContext).signup;

  useEffect(() => {
    if (modal.show) {
      document.documentElement.style.overflowY = "hidden";
      document.documentElement.style.marginRight = "17px";
      if (!savedURL) setSavedURL(window.location.href);
      window.history.pushState({}, "", "/signup");
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
      <div className="flex flex-col items-center bg-white relative rounded-xl h-[650px] w-[600px]">
        <div className="w-full flex">
          <button
            onClick={() => {
              modal.toggle(false);
            }}
            className="relative left-[16px] top-[16px]"
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
        </div>
        <div className="grow flex flex-col justify-start items-center justify-center min-w-[364px] max-w-[364px] pb-[48px] m-auto h-full">
          <h2 className="font-bold text-3xl my-[12px]">Create your account</h2>
          <div className="w-full py-[12px] flex flex-col gap-[32px]">
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Name"
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 transition-100 rounded"
            />
            <input
              onChange={(e) => {
                setHandle(e.target.value);
              }}
              placeholder="Handle"
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 transition-100 rounded"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 transition-100 rounded"
            />
            <input
              onChange={(e) => {
                setBirthdate(e.target.value);
              }}
              placeholder="Date of birth"
              type={"date"}
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 transition-100 rounded"
            />
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
              props.signupFunc({ username, handle, email, password });
              modal.toggle(false);
            }}
            className="border-solid bg-red-500 hover:bg-red-600 text-white w-full border-[1px] rounded-full border-gray-500 font-bold p-3"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
