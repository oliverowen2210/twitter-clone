import React, { useEffect } from "react";

export default function Explore(props) {
  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, []);
}
