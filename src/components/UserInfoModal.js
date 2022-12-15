import { useContext } from "react";

import { UserContext, LayersContext } from "./App";

export default function UserInfoModal(props) {
  let user = useContext(UserContext);
  let modal = useContext(LayersContext).userInfo;

  return modal.show ? (
    <div className="z-[100] fixed w-screen h-screen">
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      />
      <div
        className="flex flex-col fixed shadow-[0_0_4px_0_gray] duration-1000 bg-white h-fit shadow-md border-gray-400 w-[300px] min-w-[225px] max-w-[375px]"
        style={{
          bottom: `${modal.position.bottom + 20}px`,
          left: `${modal.position.left}px`,
        }}
      >
        <button
          onClick={props.logoutFunc}
          className="font-bold w-full p-3 duration-300 hover:bg-gray-200 text-left"
        >
          Log out @{user.handle}
        </button>
        <button
          onClick={props.deleteFunc}
          className="font-bold w-full text-red-500 p-3 duration-300 hover:bg-gray-200 text-left"
        >
          Delete account
        </button>
      </div>
    </div>
  ) : null;
}
