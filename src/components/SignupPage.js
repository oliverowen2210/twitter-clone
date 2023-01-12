import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";
export default function SignupPage(props) {
  let [username, setUsername] = useState("");
  let [handle, setHandle] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const user = useContext(UserContext);
  return (
    <div>
      {user ? <Navigate to="/home" /> : null}
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="username"
      />
      <input
        onChange={(e) => {
          setHandle(e.target.value);
        }}
        placeholder="handle"
      />
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <button
        onClick={async () => {
          await props.auth.register(username, handle, email, password);
          window.location.href = `/${handle}`;
        }}
      >
        Register
      </button>
    </div>
  );
}
