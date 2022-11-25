import { useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "./Footer";
import Banner from "./Banner";
import Tweets from "./Tweets";
import Sidebar from "./Sidebar";
import LogInModal from "./LogInModal";

export default function Twitter(props) {
  let [showModal, setShowModal] = useState(false);
  let { userPage } = useParams();

  return (
    <div className={"flex min-h-[100vh] overflow-x-hidden"}>
      <LogInModal
        open={showModal}
        closeFunc={() => {
          setShowModal(false);
        }}
        loginFunc={props.auth.login}
      />
      <button
        className="absolute"
        onClick={() => {
          console.log(userPage);
        }}
      >
        test
      </button>
      <Banner className="hidden sm:block" user={props.user} />
      <div className="grow">
        <div className="flex w-[990px]">
          <Tweets db={props.db} />
          <Sidebar className="hidden lg:block" />
        </div>
      </div>
      {props.user ? null : (
        <Footer
          loginFunc={(state) => {
            setShowModal(state);
          }}
        />
      )}
    </div>
  );
}
