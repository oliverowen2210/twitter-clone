import { useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "./Footer";
import Banner from "./Banner";
import Tweets from "./Tweets";
import Sidebar from "./Sidebar";
import LogInModal from "./LogInModal";

export default function Twitter(props) {
  let [showModal, setShowModal] = useState(false);
  let { user } = useParams();

  return (
    <div className={"flex min-h-[1000px] overflow-x-hidden"}>
      <LogInModal
        open={showModal}
        closeFunc={() => {
          setShowModal(false);
        }}
        loginFunc={props.firebase.auth.login}
      />
      <button
        className="absolute"
        onClick={() => {
          console.log(user);
        }}
      >
        test
      </button>
      <Banner className="hidden sm:block" />
      <div className="grow">
        <div className="flex w-[990px]">
          <Tweets db={props.firebase.db} />
          <Sidebar className="hidden lg:block" />
        </div>
      </div>
      <Footer
        loginFunc={(state) => {
          setShowModal(state);
          console.log(`modal set to ${state}`);
        }}
      />
    </div>
  );
}
