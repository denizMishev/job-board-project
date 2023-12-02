import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const mainSearchQuery = searchQuery.mainSearch?.toLowerCase() || "";
  const locationSearchQuery = searchQuery.locationSearch?.toLowerCase() || "";
  const mobileLocationSearchQuery =
    searchQuery.mobileLocationSearch?.toLowerCase() || "";

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        mainSearchQuery,
        locationSearchQuery,
        mobileLocationSearchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
