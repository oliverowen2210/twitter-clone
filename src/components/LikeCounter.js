import React from "react";

export default function LikeCounter(props) {
  return props.likes && Object.keys(props.likes).length ? (
    <div>
      <p className="text-gray-600">
        <strong className="text-black">
          {Object.keys(props.likes).length}{" "}
        </strong>
        Likes
      </p>
    </div>
  ) : null;
}
