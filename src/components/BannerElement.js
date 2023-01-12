import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BannerElement(props) {
  let [bold, setBold] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === props.link) setBold("font-bold");
    else setBold("");
  }, [props.link, location]);
  return (
    <div
      className={
        (props.class ? props.class : null) +
        ` flex justify-end xl:justify-start`
      }
    >
      <Link to={props.link ? props.link : null} className="flex items-center">
        <div className="flex items-center max-w-full p-[12px]">
          <svg
            viewBox="0 0 24 24"
            className={`h-[1.75rem] fill-current text-${
              props.color ? props.color : "black"
            }`}
          >
            <g>
              <path d={bold ? [props.path.alt] : [props.path.default]} />
            </g>
          </svg>
          <span
            className={`${bold} ml-[20px] mr-[16px] text-2xl hidden xl:inline`}
          >
            {props.name ? props.name : null}
          </span>
        </div>
      </Link>
    </div>
  );
}
