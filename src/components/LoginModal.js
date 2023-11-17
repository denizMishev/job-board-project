import React, { useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function LoginModal({ onClose, show }) {
  let auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!show) {
    return null;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });

    onClose();
  };

  return (
    <div
      style={{
        width: "350px",
        height: "350px",
        zIndex: "3",
        backgroundColor: "red",
        position: "absolute",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div onClick={onClose}>Close</div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
