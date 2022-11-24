import { useState } from "react";

export default function SignupPage(props) {
  let [username, setUsername] = useState("");
  let [handle, setHandle] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div>
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
        onClick={() => {
          props.auth.register(username, handle, email, password);
        }}
      >
        Register
      </button>
    </div>
  );
}
