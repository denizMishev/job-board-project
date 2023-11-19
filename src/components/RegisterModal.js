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

  if (!show) {
    return null;
  }

  return (
    <div onClick={onClose} className="modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content | padding-300"
      >
        <div className="register-modal-container | form-container">
          <header className="form-header | register-form-header">
            <span className="form-logo fw-bold fs-400 color-primary-200 display-block">
              devjobs
            </span>
            <span className="register-title | display-block fw-bold fs-250 color-primary-switch-100">
              Create account
            </span>
          </header>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                First name
              </label>
              <input
                className="bg-neutral-100 color-primary-switch-100"
                name="firstName"
                type="text"
                value={registerFormValues.firstName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                Last name
              </label>
              <input
                className="bg-neutral-100 color-primary-switch-100"
                name="lastName"
                type="text"
                value={registerFormValues.lastName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                E-mail
              </label>
              <input
                className="bg-neutral-100 color-primary-switch-100"
                name="email"
                type="email"
                value={registerFormValues.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                Password
              </label>
              <input
                className="bg-neutral-100 color-primary-switch-100"
                name="password"
                type="password"
                value={registerFormValues.password}
                onChange={onChangeHandler}
              />
            </div>
            <button className="form-submit-button | button" type="submit">
              Submit
            </button>
          </form>
          <div className="switch-form">
            <span className="display-block color-primary-switch-100">
              Already have an account?
            </span>
            <button className="switch-form-cta color-linkblue">
              Log in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
