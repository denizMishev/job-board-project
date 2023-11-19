import React, { useState } from "react";

import { database } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export function RegisterModal({ onClose, show }) {
  const auth = getAuth();
  const usersCollection = collection(database, "users");

  const [registerFormValues, setRegisterFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const target = e.target.name;

    setRegisterFormValues((state) => ({
      ...state,
      [target]: value,
    }));
  };

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = registerFormValues;

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const userData = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          saved_jobs: [],
          jobs_applied_for: [],
        };

        return addDoc(usersCollection, userData);
      })
      .then(() => {
        console.log("User added to Firestore");
        onClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div onClick={onClose} className="modal">
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        <div className="register-modal-container | bg-neutral-100">
          <form onSubmit={handleSubmit}>
            <div onClick={onClose}>Close</div>
            <input
              name="firstName"
              type="text"
              value={registerFormValues.firstName}
              onChange={onChangeHandler}
            />
            <input
              name="lastName"
              type="text"
              value={registerFormValues.lastName}
              onChange={onChangeHandler}
            />
            <input
              name="email"
              // type="email"
              value={registerFormValues.email}
              onChange={onChangeHandler}
              placeholder="Email"
            />
            <input
              name="password"
              type="text"
              value={registerFormValues.password}
              onChange={onChangeHandler}
              placeholder="Password"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
