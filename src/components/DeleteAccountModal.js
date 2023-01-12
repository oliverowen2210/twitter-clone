import React, { useState, useContext } from "react";
import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "@firebase/auth";

import { UserContext, DBContext, LayersContext } from "./App";
import { auth } from "../firebase";
import SVGs from "../images/SVGs";

export default function DeleteAccountModal(props) {
  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const modal = useContext(LayersContext).deleteAccount;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function deleteAccount() {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (err) {
      return;
    }

    for (let tweet in user.tweets) {
      const id = user.tweets[tweet].id;
      const tweetRef = doc(db, "tweets", id);
      const tweetDoc = await getDoc(tweetRef);
      const tweetData = tweetDoc.data();
      await props.deleteTweetFunc(tweetData);
    }
    const handleRef = doc(db, "handles", user.handle);
    await deleteDoc(handleRef);
    const userRef = doc(db, "users", user.uid);
    await deleteDoc(userRef);

    await deleteUser(auth.currentUser);
    window.location.reload();
  }

  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      <div
        className="w-full h-full absolute top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      ></div>
      <div className="flex flex-col items-center bg-white relative rounded-xl h-[400px] w-[600px]">
        <div className="flex w-full justify-between">
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
          <h3 className="text-xl font-bold my-[12px]">Account Deletion</h3>
          <div />
        </div>
        <p className="w-[50%]">
          To confirm you want to delete your account, verify your email and
          password.
        </p>
        <div className="w-[50%] mt-[16px]">
          <div className="w-full pb-[24px]">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 duration-100 rounded"
            />
          </div>
          <div className="w-full pb-[24px]">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              type={"password"}
              className="p-4 w-full outline-gray-400 outline outline-1 focus:outline-black focus:outline-2 duration-100 rounded"
            />
          </div>
        </div>

        <button
          onClick={() => {
            deleteAccount();
          }}
          className="bg-red-500 hover:bg-red-600 border-solid border-[1px] border-black text-white font-bold px-[24px] py-[12px] rounded-full mt-[24px]"
        >
          Delete
        </button>
      </div>
    </div>
  ) : null;
}
