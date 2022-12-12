import { useContext } from "react";

import { LayersContext } from "./App";
import ProfilePicBig from "./ProfilePicBig";
import SVGs from "../images/SVGs";

export default function EditProfileModal() {
  const modal = useContext(LayersContext).editProfile;
  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      <div
        className="w-full h-full absolute top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      ></div>
      <div className="flex flex-col items-center bg-white relative rounded-xl overflow-x-hidden overflow-y-auto h-[650px] w-[600px]">
        <div className="flex items-center w-full pt-[12px] mb-[12px]">
          <div className="w-[16px]" />
          <button
            onClick={() => {
              modal.toggle(false);
            }}
          >
            <svg
              className="w-[20px] fill-current text-black"
              viewBox="0 0 24 24"
            >
              <g>
                <path d={SVGs.cross.default} />
              </g>
            </svg>
          </button>
          <div className="w-[32px]" />
          <h3 className="font-bold text-lg">Edit profile</h3>
          <div className="grow" />
          <button className="font-bold text-sm bg-black mr-[24px] rounded-full px-[16px] h-[32px] text-white">
            Save
          </button>
        </div>

        <div className="w-[99%] h-[200px] bg-gray-200 flex justify-center items-center">
          <button
            id="selectPFP"
            className="w-[48px] h-[48px] bg-gray-900 opacity-50 rounded-full text-white"
          >
            O
          </button>
        </div>

        <div className="w-full ml-[36px] h-[96px]">
          <div className="relative w-[140px] h-[140px] bottom-[72px] flex items-center justify-center">
            <ProfilePicBig />
            <button className="bg-gray-900 relative z-20 text-white rounded-full w-[48px] h-[48px]">
              O
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <form className="w-[95%]">
            <div className="mb-[32px] group focus-within:font-bold focus-within:outline-black rounded focus-within:outline-3 outline outline-gray-400 outline-1 flex flex-col">
              <label
                htmlFor="profileNameInput"
                className="pl-[8px] font-inherit"
              >
                Name
              </label>
              <input
                id="profileNameInput"
                name="profileNameInput"
                className="focus:outline-0"
              />
            </div>
            <div className="group focus-within:font-bold focus-within:outline-black rounded focus-within:outline-3 outline outline-gray-400 outline-1 flex flex-col">
              <label
                htmlFor="profileBioInput"
                className="pl-[8px] font-inherit"
              >
                Bio
              </label>
              <textarea
                id="profileBioInput"
                name="profileBioInput"
                className="focus:outline-0 max-h-[150px]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
