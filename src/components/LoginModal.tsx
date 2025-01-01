import { useState } from "react";
import { loginUser } from "../api/loginUser";

import { authErrorMessages, firebaseErrorParser } from "../utils/errorMessages";
import { regexEmail } from "../utils/errorParameters";

import Form from "./Form";
import { LoadingSpinner } from "./LoadingSpinner";
import { FirebaseError } from "firebase/app";

import { LoginFormValues } from "../types/LoginFormValues";

interface LoginModalProps {
  onClose: () => void;
  show: boolean;
  showRegisterModal: (show: boolean) => void;
}

export function LoginModal({
  onClose,
  show,
  showRegisterModal,
}: LoginModalProps) {
  const [firebaseError, setFirebaseError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (loginFormValues: LoginFormValues) => {
    setIsLoading(true);
    try {
      await loginUser(loginFormValues);
      onClose();
      console.log("User logged in successfully");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(firebaseErrorParser(error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchToRegister = () => {
    onClose();
    showRegisterModal(true);
  };

  const loginFormFields = [
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
    },
  ];

  if (!show) return null;

  return (
    <div onClick={onClose} className="modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content | padding-300"
      >
        <div
          className="close-button-container"
          onClick={onClose}
          data-place={"register"}
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
          <LoadingSpinner />
        ) : (
          <div className="login-modal-container | form-container">
            <header className="form-header | login-form-header">
              <span className="form-logo fw-bold fs-400 color-primary-200 display-block">
                devjobs
              </span>
              <span className="login-title | display-block fw-bold fs-250 color-primary-switch-100">
                Sign in to your account
              </span>
              {firebaseError && (
                <span className="register-form-backend-error | color-red fw-bold fs-200">
                  {firebaseError}
                </span>
              )}
            </header>
            <Form<LoginFormValues>
              inputFields={loginFormFields}
              handleSubmit={handleSubmit}
            />
            <div className="switch-form">
              <span className="display-block color-primary-switch-100">
                Don't have an account yet?
              </span>
              <button
                onClick={() => switchToRegister()}
                className="switch-form-cta color-linkblue fw-bold fs-200"
              >
                Sign up
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
