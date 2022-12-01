import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "./App";
import SVGs from "../images/SVGs";

export default function UserInfo(props) {
  let [showPopup, setShowPopup] = useState(false);
  let [popupRect, setPopupRect] = useState({ left: 0, bottom: 0 });
  let infoRef = useRef(null);
  let user = useContext(UserContext);

  function updatePopupRect() {
    const boundingRect = infoRef.current.getBoundingClientRect();
    const bottom = boundingRect.height;
    const left = boundingRect.left;
    setPopupRect({ left, bottom });
  }

  useEffect(() => {
    let timer;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(updatePopupRect, 100);
    });
  }, []);

  return (
    <div ref={infoRef} className="mt-auto self-end">
      <div
        onClick={() => {
          setShowPopup(true);
          updatePopupRect();
        }}
        className="flex rounded-full transition-500 xl:px-4 mb-2 py-2 hover:bg-gray-300"
      >
        <div className="profilepic rounded-full penguin" />
        <div className="hidden xl:block">
          <h3 className="font-bold">{user.username}</h3>
          <p>@{user.handle}</p>
        </div>
        <div className="pl-[20px] hidden xl:flex">
          <svg viewBox="0 0 24 24" className="w-[20px]">
            <g>
              <path d={SVGs.dots.default} />
            </g>
          </svg>
        </div>
      </div>

      <div
        className={
          (showPopup ? "absolute " : "hidden ") + "top-0 left-0 w-full h-full"
        }
        onClick={() => {
          setShowPopup(false);
        }}
      />

      <div
        className={
          (showPopup ? "" : "hidden ") +
          `fixed transition-1000 bg-white h-[200px] shadow-md border-gray-400 w-[300px] min-w-[225px] max-w-[375px]`
        }
        style={{
          bottom: `${popupRect.bottom + 20}px`,
          left: `${popupRect.left}px`,
        }}
      >
        <button
          onClick={props.logoutFunc}
          className="font-bold w-full p-3 transition-300 hover:bg-gray-200"
        >
          Log out @{user.handle}
        </button>
      </div>
    </div>
  );
}
