import React, { Suspense } from "react";

import { SearchProvider } from "./context/SearchContext";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { JobSection } from "./components/JobSection";
import { JobDetails } from "./components/JobDetails";
import { LoadingSpinner } from "./components/LoadingSpinner";

function App() {
  return (
    <SearchProvider>
      <div className="App | bg-neutral-200">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
                <JobSection />
              </Suspense>
            }
          ></Route>
          <Route path="/jobs/:jobId" element={<JobDetails />}></Route>
        </Routes>
      </div>
    </SearchProvider>
  );
}

export default App;
