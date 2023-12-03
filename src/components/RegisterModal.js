import React, { useState } from "react";

import { authErrorMessages, firebaseErrorParser } from "../utils/errorMessages";
import {
  regexEmail,
  regexSingleName,
  regexPassword,
} from "../utils/errorParameters";

import { database, usersCollection } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export function RegisterModal({ onClose, show, showLoginModal }) {
  const auth = getAuth();
  const databaseCollection = collection(database, usersCollection);

  const [registerFormValues, setRegisterFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [focusedField, setFocusedField] = useState({
    firstNameFocus: false,
    lastNameFocus: false,
    emailFocus: false,
    passwordFocus: false,
  });

  const [firebaseError, setFirebaseError] = useState(false);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const target = e.target.name;

    setRegisterFormValues((state) => ({
      ...state,
      [target]: value,
    }));
  };

  const onBlurHandler = (e) => {
    const target = e.target.name + "Focus";

    setFocusedField((state) => ({
      ...state,
      [target]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = registerFormValues;

    if (firstName === "" || lastName === "") {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            const userData = {
              email: email,
              first_name: firstName,
              last_name: lastName,
              saved_jobs: [],
              jobs_applied_for: [],
            };

            return addDoc(databaseCollection, userData);
          })
          .then(() => {
            console.log("user added to db");
            onClose();
          });
      })
      .catch((error) => {
        setFirebaseError(firebaseErrorParser(error.message));
      });
  };

  const switchToLogin = () => {
    onClose();
    showLoginModal(true);
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
        <div
          className="close-button-container"
          onClick={onClose}
          place={"register"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
        <div className="register-modal-container | form-container">
          <header className="form-header | register-form-header">
            <span className="form-logo fw-bold fs-400 color-primary-200 display-block">
              devjobs
            </span>
            <span className="register-title | display-block fw-bold fs-250 color-primary-switch-100">
              Create account
            </span>
            {firebaseError && (
              <span className="register-form-backend-error">
                {firebaseError}
              </span>
            )}
          </header>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                First name
              </label>
              <input
                className="user-form-input-field | bg-neutral-100 color-primary-switch-100"
                name="firstName"
                type="text"
                required
                pattern={regexSingleName}
                value={registerFormValues.firstName}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                focused={focusedField.firstNameFocus.toString()}
              />
              <span className="user-form-error | color-red fs-100">
                {authErrorMessages.firstName}
              </span>
            </div>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                Last name
              </label>
              <input
                className="user-form-input-field | bg-neutral-100 color-primary-switch-100"
                name="lastName"
                type="text"
                required
                pattern={regexSingleName}
                value={registerFormValues.lastName}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                focused={focusedField.lastNameFocus.toString()}
              />
              <span className="user-form-error | color-red fs-100">
                {authErrorMessages.lastName}
              </span>
            </div>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                E-mail
              </label>
              <input
                className="user-form-input-field | bg-neutral-100 color-primary-switch-100"
                name="email"
                type="email"
                required
                pattern={regexEmail}
                value={registerFormValues.email}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                focused={focusedField.emailFocus.toString()}
              />
              <span className="user-form-error | color-red fs-100">
                {authErrorMessages.email}
              </span>
            </div>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                Password
              </label>
              <input
                className="user-form-input-field | bg-neutral-100 color-primary-switch-100"
                name="password"
                type="password"
                required
                pattern={regexPassword}
                value={registerFormValues.password}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                focused={focusedField.passwordFocus.toString()}
              />
              <span className="user-form-error | color-red fs-100">
                {authErrorMessages.password}
              </span>
            </div>
            <button className="form-submit-button | button" type="submit">
              Submit
            </button>
            <span className="required-fields | fs-100 color-neutral-500">
              *All fields required
            </span>
          </form>
          <div className="switch-form">
            <span className="display-block color-primary-switch-100">
              Already have an account?
            </span>
            <button
              onClick={() => switchToLogin()}
              className="switch-form-cta color-linkblue fw-bold fs-200"
            >
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
