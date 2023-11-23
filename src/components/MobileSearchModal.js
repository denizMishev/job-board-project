import React, { useEffect, useState } from "react";
import { useSearch } from "../Context/SearchContext";

export function MobileSearchModal({ onClose, show, handleSearch }) {
  const [locationFilter, setLocationFilter] = useState("");
  const { setSearchQuery } = useSearch();

  const handleSearchMobile = () => {
    setSearchQuery((state) => ({
      ...state,
      mobileLocationSearch: locationFilter,
    }));
    onClose();
  };

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-content | padding-350"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{ display: "flex" }}
          className="location-filter-container | bg-neutral-100"
        >
          <svg width="17" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.358 2.451A8.3 8.3 0 008.448 0a8.3 8.3 0 00-5.911 2.451c-2.922 2.925-3.285 8.427-.786 11.76l6.697 9.683 6.687-9.669c2.508-3.347 2.145-8.85-.777-11.774zm-5.833 8.894a3.057 3.057 0 01-3.051-3.054 3.057 3.057 0 013.05-3.055 3.057 3.057 0 013.052 3.055 3.057 3.057 0 01-3.051 3.054z"
              fill="#5964E0"
              fillRule="nonzero"
            />
          </svg>
          <input
            name="locationSearch"
            className="color-primary-switch-100 bg-neutral-100"
            type="text"
            placeholder="Filter by location.."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        <hr className="modal-seperator" />
        <div
          style={{ display: "flex" }}
          className="submition-container | bg-neutral-100"
        >
          <div>
            <label class="custom-checkbox-container | color-primary-switch-100 fw-bold">
              Full Time <span class="dynamic-text">Only</span>
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
          <button
            onClick={handleSearchMobile}
            className="button"
            data-type="main-search-btn"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
