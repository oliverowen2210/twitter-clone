import { useContext } from "react";

import { UserContext, LayersContext } from "./App";

export default function TweetModal(props) {
  let user = useContext(UserContext);
  let modal = useContext(LayersContext).tweet;

  return modal.show ? (
    <div className="bg-gray-800 z-[100] fixed top-0 left-0 w-screen h-screen bg-opacity-30 flex justify-center items-center">
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={() => {
          modal.toggle(false);
        }}
      />
      <div className="flex flex-col pt-[24px] items-center bg-white relative rounded-xl h-[650px] w-[600px]">
        tweet
      </div>
    </div>
  ) : null;
}
