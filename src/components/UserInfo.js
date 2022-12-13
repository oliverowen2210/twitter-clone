import { useRef, useEffect, useContext, useCallback } from "react";

import { UserContext, LayersContext } from "./App";
import SVGs from "../images/SVGs";
import ProfilePic from "./ProfilePic";

export default function UserInfo() {
  let modal = useContext(LayersContext).userInfo;
  let infoRef = useRef(null);
  let user = useContext(UserContext);

  const updateModalRect = useCallback(() => {
    const boundingRect = infoRef.current.getBoundingClientRect();
    const left = boundingRect.left;
    const bottom = boundingRect.height;
    modal.setPosition(left, bottom);
  }, [modal]);

  useEffect(() => {
    let timer;

    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(updateModalRect, 100);
    });
  }, [modal, updateModalRect]);

  return (
    <div ref={infoRef} className="mt-auto self-end">
      <div
        onClick={() => {
          modal.toggle(true);
          updateModalRect();
        }}
        className="flex rounded-full transition-500 xl:px-4 mb-2 py-2 hover:bg-gray-300"
      >
        <ProfilePic id={user.uid} />
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
    </div>
  );
}
