import React from "react";
import { Routes, Route } from "react-router-dom";

// import { app } from "./firebaseConfig";

import { Header } from "./components/Header";
import { Jobsection } from "./components/Jobsection";
import { SearchProvider } from "./Context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <div className="App">
        <Header />
        <Jobsection />
      </div>
    </SearchProvider>
  );
}

export default App;
