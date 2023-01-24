import React, { useState, useEffect, useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../../firebase";
import { UserContext, DBContext, ModalsContext } from "../App";
import ProfilePic from "../ProfilePic";
import SVGs from "../../images/SVGs";

export default function EditProfileModal() {
  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const modal = useContext(ModalsContext).editProfile;

  let [selectedName, setSelectedName] = useState(
    user.username ? user.name : null
  );
  let [selectedBio, setSelectedBio] = useState(user.bio ? user.bio : null);
  let [selectedBanner, setSelectedBanner] = useState(null);
  let [selectedPFP, setSelectedPFP] = useState(null);

  const stateVars = [selectedName, selectedBio, selectedBanner, selectedPFP];

  const stateSetters = [
    setSelectedName,
    setSelectedBio,
    setSelectedBanner,
    setSelectedPFP,
  ];

  useEffect(() => {
    if (!user) return;
    setSelectedName(user.username);
    if (!!user.bio) setSelectedBio(user.bio);
  }, [user]);

  function didProfileChange() {
    for (let stateVar of stateVars) {
      if (stateVar) return true;
    }
    return false;
  }

  function discardChanges() {
    for (let setState of stateSetters) {
      setState(null);
    }
  }

  function getImageType(type) {
    return type.substr(type.lastIndexOf("/") + 1);
  }

  async function handleSave() {
    if (selectedName) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        username: selectedName,
      });
    }

    if (selectedBio || selectedBio === "") {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        bio: selectedBio,
      });
    }

    if (selectedBanner) {
      const imageRef = ref(storage, `${user.uid}/banner`);

      await uploadBytes(imageRef, selectedBanner);

      let bannerURL = await getDownloadURL(imageRef);

      let userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        banner: bannerURL,
      });
    }

    if (selectedPFP) {
      const imageRef = ref(storage, `${user.uid}/PFP`);

      await uploadBytes(imageRef, selectedPFP);

      let PFPURL = await getDownloadURL(imageRef);

      let userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        PFP: PFPURL,
      });
    }

    window.location.reload();
  }

  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      {/** screen block */}
      <div
        className="w-full h-full absolute top-0 left-0"
        onClick={() => {
          modal.toggle(false);
          discardChanges();
        }}
      ></div>

      {/** modal */}
      <div className="flex flex-col items-center bg-white relative rounded-xl overflow-x-hidden overflow-y-auto h-[650px] w-[600px]">
        <div className="flex items-center w-full pt-[12px] mb-[12px]">
          <div className="w-[16px]" />

          {/** X button on the top left */}
          <button
            onClick={() => {
              modal.toggle(false);
              discardChanges();
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
          <button
            onClick={() => {
              if (!didProfileChange()) {
                modal.toggle(false);
                discardChanges();
                return;
              } else handleSave();
            }}
            className="font-bold text-sm bg-black mr-[24px] rounded-full px-[16px] h-[32px] text-white"
          >
            Save
          </button>
        </div>

        {/**banner/header image input */}
        <div
          style={
            selectedBanner
              ? {
                  backgroundImage: `url(${URL.createObjectURL(
                    selectedBanner
                  )})`,
                }
              : user.banner
              ? { backgroundImage: `url(${user.banner})` }
              : null
          }
          className="w-[99%] h-[200px] bg-gray-200 bg-center bg-no-repeat bg-cover flex justify-center items-center"
        >
          <label htmlFor="bannerFileInput">
            <div
              id="selectPFP"
              className="w-[48px] h-[48px] flex justify-center items-center bg-gray-900 hover:bg-gray-700 duration-200 cursor-pointer opacity-50 rounded-full text-white"
            >
              <svg viewBox="0 0 24 24" className="fill-current w-[24px]">
                <g>
                  <path d={SVGs.camera.default} />
                </g>
              </svg>
              <input
                type="file"
                accept="image/*"
                id="bannerFileInput"
                className="opacity-0 w-[1px] h-[1px] absolute"
                onChange={(e) => {
                  const imageType = getImageType(e.target.files[0].type);
                  if (imageType !== "png" && imageType !== "jpeg") {
                    return;
                  }
                  setSelectedBanner(e.target.files[0]);
                }}
              ></input>
            </div>
          </label>
        </div>

        {/** profile picture file input */}
        <div className="w-full ml-[36px] h-[96px]">
          <div className="relative w-[140px] h-[140px] bottom-[72px] flex items-center justify-center">
            <div className="absolute">
              <ProfilePic
                big={true}
                id={!selectedPFP ? user.uid : null}
                src={selectedPFP ? URL.createObjectURL(selectedPFP) : null}
              />
            </div>
            <label htmlFor="PFPFileInput">
              <div
                id="selectPFP"
                className="w-[48px] h-[48px] flex justify-center items-center bg-gray-900 hover:bg-gray-700 duration-200 cursor-pointer opacity-70 rounded-full text-white"
              >
                <svg viewBox="0 0 24 24" className="fill-current w-[24px]">
                  <g>
                    <path d={SVGs.camera.default} />
                  </g>
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  id="PFPFileInput"
                  className="opacity-0 w-[1px] h-[1px] absolute"
                  onChange={(e) => {
                    const imageType = getImageType(e.target.files[0].type);
                    if (imageType !== "png" && imageType !== "jpeg") {
                      return;
                    }
                    setSelectedPFP(e.target.files[0]);
                  }}
                ></input>
              </div>
            </label>
          </div>
        </div>

        {/** text inputs */}
        <div className="w-full flex justify-center">
          <form className="w-[95%]">
            <div className="pl-[8px] mb-[32px] group focus-within:outline-black rounded focus-within:outline-3 outline outline-gray-400 outline-1 flex flex-col">
              <label htmlFor="profileNameInput" className=" font-inherit">
                Name
              </label>
              <input
                id="profileNameInput"
                name="profileNameInput"
                className="focus:outline-0"
                value={selectedName}
                onChange={(e) => {
                  setSelectedName(e.target.value);
                }}
              />
            </div>
            <div className="pl-[8px] group focus-within:outline-black rounded focus-within:outline-3 outline outline-gray-400 outline-1 flex flex-col">
              <label htmlFor="profileBioInput" className="font-inherit">
                Bio
              </label>
              <textarea
                id="profileBioInput"
                name="profileBioInput"
                className="focus:outline-0 max-h-[150px] resize-none"
                value={selectedBio}
                onChange={(e) => {
                  setSelectedBio(e.target.value);
                }}
                maxLength={150}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
