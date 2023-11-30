import React, { useState } from "react";

import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";

export function UserNavButtons() {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const menuVisibilityButton = () => {
    setMenuVisibility(!menuVisibility);
  };

  return (
    <div>
      <RegisterModal
        onClose={() => setShowRegisterModal(false)}
        show={showRegisterModal}
      />
      <LoginModal
        onClose={() => setShowLoginModal(false)}
        show={showLoginModal}
      />
      <div className="usernav-container-mobile">
        <button onClick={menuVisibilityButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"
            />
          </svg>
        </button>
        {menuVisibility && (
          <ul className="usernav-menu-mobile | menu-popup">
            <li
              className="usernav-menu-li"
              onClick={() => setShowLoginModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="21"
                width="21"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                />
              </svg>
              <button>Login</button>
            </li>
            <li
              className="usernav-menu-li"
              onClick={() => setShowRegisterModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="21"
                width="21"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                />
              </svg>
              <button>Sign-up</button>
            </li>
          </ul>
        )}
      </div>
      <ul className="usernav-container-desktop">
        <li
          onClick={() => setShowLoginModal(true)}
          className="usernav-login-li"
        >
          Login
        </li>
        <li
          onClick={() => setShowRegisterModal(true)}
          className="usernav-register-li"
        >
          Sign-up
        </li>
      </ul>
    </div>
  );
}
