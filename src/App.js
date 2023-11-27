import React from "react";

import { SearchProvider } from "./Context/SearchContext";
import { AuthProvider } from "./Context/AuthContext";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Jobsection } from "./components/Jobsection";
import { JobDetails } from "./components/JobDetails";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <div className="App | bg-neutral-200">
          <Header />
          <Routes>
            <Route path="/" element={<Jobsection />}></Route>
            <Route path="/jobs/:jobId" element={<JobDetails />}></Route>
          </Routes>
        </div>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
