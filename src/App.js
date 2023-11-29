import React from "react";

import { SearchProvider } from "./context/SearchContext";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { JobSection } from "./components/JobSection";
import { JobDetails } from "./components/JobDetails";

function App() {
  return (
    <SearchProvider>
      <div className="App | bg-neutral-200">
        <Header />
        <Routes>
          <Route path="/" element={<JobSection />}></Route>
          <Route path="/jobs/:jobId" element={<JobDetails />}></Route>
        </Routes>
      </div>
    </SearchProvider>
  );
}

export default App;
