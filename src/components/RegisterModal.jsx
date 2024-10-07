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

import Form from "./Form";
import { LoadingSpinner } from "./LoadingSpinner";

export function RegisterModal({ onClose, show, showLoginModal }) {
  const auth = getAuth();

  const databaseCollection = collection(database, usersCollection);

  const [firebaseError, setFirebaseError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e, registerFormValues) => {
    e.preventDefault();
    setIsLoading(true);

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
            onClose();
            setIsLoading(false);
            console.log("user added to db");
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

  const registerFormFields = [
    {
      name: "firstName",
      label: "First name",
      type: "text",
      required: true,
      pattern: regexSingleName,
      errorMessage: authErrorMessages.firstName,
    },
    {
      name: "lastName",
      label: "Last name",
      type: "text",
      required: true,
      pattern: regexSingleName,
      errorMessage: authErrorMessages.lastName,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      pattern: regexEmail,
      errorMessage: authErrorMessages.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      pattern: regexPassword,
      errorMessage: authErrorMessages.password,
    },
  ];

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
        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
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
            <Form fields={registerFormFields} handleSubmit={handleSubmit} />
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
        )}
      </div>
    </div>
  );
}
