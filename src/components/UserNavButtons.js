import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";
import { Logout } from "./Logout";

export function UserNavButtons() {
  const { authenticatedUser } = useAuth();

  const [menuVisibility, setMenuVisibility] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [waitForAuth, setWaitForAuth] = useState(false);

  setTimeout(() => {
    setWaitForAuth(true);
  }, 650);

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
            {authenticatedUser ? (
              <li className="usernav-menu-li">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="21"
                  width="21"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
                  />
                </svg>
                <Logout></Logout>
              </li>
            ) : (
              <>
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
              </>
            )}
          </ul>
        )}
      </div>
      {waitForAuth && (
        <ul className="usernav-container-desktop">
          {authenticatedUser ? (
            <>
              <li className="usernav-name | usernav-li">
                {authenticatedUser.displayName}
              </li>
              <li className="usernav-logout-li | usernav-li">
                <Logout></Logout>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => setShowLoginModal(true)}
                className="usernav-login-li | usernav-li"
              >
                Login
              </li>
              <li
                onClick={() => setShowRegisterModal(true)}
                className="usernav-register-li | usernav-li"
              >
                Sign-up
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
