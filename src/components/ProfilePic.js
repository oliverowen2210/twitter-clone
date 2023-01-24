import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";

import { StorageContext } from "./App";

export default function ProfilePic(props) {
  const storage = useContext(StorageContext);
  const [PFPURL, setPFPURL] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    async function getURL() {
      let PFPRef = ref(storage, `${props.id}/PFP`);
      let URL;
      try {
        URL = await getDownloadURL(PFPRef);
        setPFPURL(URL);
      } catch (err) {
        URL = await getDownloadURL(ref(storage, "defaultPFP.png"));
        setPFPURL(URL);
      }
      setBusy(false);
    }
    getURL();
  }, [PFPURL, props.storage, props.id, storage]);

  return busy ? null : (
    <Link to={props.link ? `${props.link}` : null} className={"relative z-10"}>
      <div
        style={
          props.src
            ? { backgroundImage: `url(${props.src})` }
            : PFPURL
            ? { backgroundImage: `url("${PFPURL}")` }
            : null
        }
        className={
          (props.big
            ? "w-[133.5px] h-[133.5px] "
            : "mr-[12px] w-[48px] h-[48px] ") +
          "bg-center bg-cover bg-no-repeat rounded-full"
        }
        alt="profile pic"
      />
    </Link>
  );
}
