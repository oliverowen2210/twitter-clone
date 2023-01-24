import React, { useState, useEffect, useContext, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";

import SVGs from "../../images/SVGs";
import { DBContext, ModalsContext } from "../App";

export default function SignUpModal(props) {
  let [nameIsValid, setNameIsValid] = useState(false);
  let [handleIsValid, setHandleIsValid] = useState(false);
  let [emailIsValid, setEmailIsValid] = useState(false);
  let [passwordIsValid, setPasswordIsValid] = useState(false);
  let [username, setUsername] = useState("");
  let [handle, setHandle] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [savedURL, setSavedURL] = useState("");

  let db = useContext(DBContext);
  let modal = useContext(ModalsContext).signup;

  let handleTimer;
  let handleInputRef = useRef(null);

  let signingUpTimer;

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

  function removeSpaces(str) {
    return str.replace(/\s/g, "");
  }

  async function checkIfHandleTaken(handle) {
    const docRef = doc(db, "handles", handle);
    try {
      let docData = await getDoc(docRef);
      if (!!docData.data()) return true;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleHandleInputChange(handle) {
    setHandle(handle);
    if (handle === "") {
      setHandleIsValid(false);

      handleInputRef.current.reportValidity();
      return;
    }
    clearTimeout(handleTimer);
    handleTimer = setTimeout(async () => {
      const handleTaken = await checkIfHandleTaken(handle);
      if (!handleTaken) {
        handleInputRef.current.setCustomValidity("");
        setHandleIsValid(true);
      } else {
        handleInputRef.current.setCustomValidity(
          "A user with that handle already exists."
        );
        handleInputRef.current.reportValidity();
        setHandleIsValid(false);
      }
    }, 500);
  }

  function trimKeepingTrailingSpace(str) {
    let trimmedStr = str.trim();
    let splitStr = str.split("");
    if (splitStr[splitStr.length - 1] === " ") {
      trimmedStr = trimmedStr + " ";
    }
    return trimmedStr;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    clearTimeout(signingUpTimer);
    signingUpTimer = setTimeout(async () => {
      await setUsername(username.trim());
      if (!(nameIsValid && handleIsValid && emailIsValid && passwordIsValid))
        return;
      props.signupFunc({ username, handle, email, password });
      modal.toggle(false);
    }, 700);
  }

  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      <div
        className="w-full h-full absolute top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      ></div>
      <form className="flex flex-col items-center bg-white relative rounded-xl h-[650px] w-[600px]">
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
                const trimmedUsername = trimKeepingTrailingSpace(
                  e.target.value
                );

                const isValid = e.target.checkValidity();
                if (!isValid) {
                  e.target.reportValidity();
                  setNameIsValid(false);
                } else setNameIsValid(true);
                setUsername(trimmedUsername);
              }}
              required
              value={username}
              placeholder="Name"
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 duration-100 rounded"
            />
            <input
              onChange={(e) => {
                const noSpaceHandle = removeSpaces(e.target.value);
                handleHandleInputChange(noSpaceHandle);
              }}
              required
              ref={handleInputRef}
              value={handle}
              placeholder="Handle"
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 duration-100 rounded"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                const isValid = e.target.checkValidity();
                if (!isValid) {
                  e.target.reportValidity();
                  setEmailIsValid(false);
                } else setEmailIsValid(true);
              }}
              required
              placeholder="Email"
              type={"email"}
              className="p-4 w-full invalid:outline-red-200 outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 duration-100 rounded"
            />
            <input
              onChange={(e) => {
                const password = e.target.value;

                setPassword(password);
                const isValid = e.target.checkValidity();
                if (!isValid) {
                  e.target.reportValidity();
                  setPasswordIsValid(false);
                } else setPasswordIsValid(true);
              }}
              required
              placeholder="Password"
              minLength={6}
              type={"password"}
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 duration-100 rounded"
            />
          </div>
          <div className="grow" />
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className={
              (nameIsValid && handleIsValid && emailIsValid && passwordIsValid
                ? "hover:bg-red-600 "
                : "cursor-default opacity-50 ") +
              "border-solid text-white bg-red-500 w-full border-[1px] rounded-full border-gray-500 font-bold p-3"
            }
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  ) : null;
}
