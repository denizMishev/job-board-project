import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function LoginModal({ onClose, show }) {
  let auth = getAuth();

  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setLoginFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginFormValues;

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        alert(error.message);
      });

    onClose();
  };

  return (
    <div onClick={onClose} className="modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content | padding-300"
      >
        <div className="login-modal-container | form-container">
          <header className="form-header | login-form-header">
            <span className="form-logo fw-bold fs-400 color-primary-200 display-block">
              devjobs
            </span>
            <span className="login-title | display-block fw-bold fs-250 color-primary-switch-100">
              Sign in to your account
            </span>
          </header>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                E-mail
              </label>
              <input
                className="bg-neutral-100 color-primary-switch-100"
                name="email"
                type="email"
                value={loginFormValues.email}
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
                value={loginFormValues.password}
                onChange={onChangeHandler}
              />
            </div>
            <button className="form-submit-button | button" type="submit">
              Submit
            </button>
          </form>
          <div className="switch-form">
            <span className="display-block color-primary-switch-100">
              Don't have an account yet?
            </span>
            <button className="switch-form-cta color-linkblue">
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
      </div>
    </div>
  );
}
