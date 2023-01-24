import React, { useState, useEffect, useContext } from "react";
import { ModalsContext } from "../App";

export default function ProfileSetupModal(props) {
  let [savedURL, setSavedURL] = useState("");
  let modal = useContext(ModalsContext).profileSetup;

  useEffect(() => {
    if (modal.show) {
      document.documentElement.style.overflowY = "hidden";
      document.documentElement.style.marginRight = "17px";
      if (!savedURL) setSavedURL(window.location.href);
      window.history.pushState({}, "", "/setup_profile");
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
    </div>
  ) : null;
}
