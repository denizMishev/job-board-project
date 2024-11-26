import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { JobsSection } from "./components/JobsSection";
import { JobDetails } from "./components/JobDetails.tsx";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorHandler } from "./components/ErrorHandler";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandler}
      onError={() => console.error("Unexpected error ocurred.")}
    >
      <AuthProvider>
        <SearchProvider>
          <div className="App | bg-neutral-200">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
                    <JobsSection />
                  </Suspense>
                }
              ></Route>
              <Route path="/jobs/:jobId" element={<JobDetails />}></Route>
            </Routes>
          </div>
        </SearchProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
