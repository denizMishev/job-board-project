import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/components.css";
import "./styles/site-header.css";
import "./styles/theme-switch.css";
import "./styles/mobile-search-modal.css";
import "./styles/jobs-section.css";
import "./styles/job-details.css";
import "./styles/no-results.css";
import "./styles/error-handler.css";
import "./styles/job-card.css";
import "./styles/job-apply-form.css";
import "./styles/success-announcement-modal.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
  </BrowserRouter>
);
