import React from "react";
import { Header } from "./components/Header";
import { Jobsection } from "./components/Jobsection";
import { SearchProvider } from "./Context/SearchContext";

// function App() {
//   return (

//     <div className="App">
//       <Header></Header>
//       <Jobsection></Jobsection>
//     </div>
//   );
// }

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
