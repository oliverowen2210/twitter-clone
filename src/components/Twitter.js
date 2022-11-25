import { useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "./Footer";
import Banner from "./Banner";
import HomePage from "./HomePage";
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
      <Banner user={props.user} logoutFunc={props.auth.logout} />
      <div className="grow">
        <div className="w-[600px] lg:w-[920px] xl:w-[990px] flex grow">
          <HomePage db={props.db} user={props.user} />
          <Sidebar />
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
