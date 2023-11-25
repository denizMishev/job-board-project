import React from "react";
import { Routes, Route } from "react-router-dom";

// import { app } from "./firebaseConfig";

import { Header } from "./components/Header";
import { Jobsection } from "./components/Jobsection";
import { SearchProvider } from "./Context/SearchContext";
import { JobDetails } from "./components/JobDetails";

function App() {
  return (
    <SearchProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Jobsection />}></Route>
          <Route path="/jobs/:jobId" element={<JobDetails />}></Route>
          {/* <Jobsection /> */}
        </Routes>
      </div>
    </SearchProvider>
  );
}

export default App;
