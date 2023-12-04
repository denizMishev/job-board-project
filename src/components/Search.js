import { useState } from "react";
import { useSearch } from "../context/SearchContext";

import { MobileSearchModal } from "./MobileSearchModal";
import { useLocation } from "react-router-dom";

export function Search() {
  const location = useLocation();

  const { setSearchQuery, jobContractFilter, setJobContractFilter } =
    useSearch();

  const [showMobileSearchModal, setShowMobileSearchModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = {
      mainSearch:
        e.target.elements.mainSearch.value ||
        e.target.elements.mobileMainSearch.value,

      locationSearch: e.target.elements.locationSearch.value,
    };
    setSearchQuery((state) => ({
      ...state,
      ...searchInput,
    }));
  };

  return (
    <div
      className={`main-search-container ${
        location.pathname.includes("jobs") ? "display-none" : ""
      }`}
    >
      <form onSubmit={handleSearch} action="">
        <div className="form-elements-container">
          <div className="keyword-filter-container | bg-neutral-100">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z"
                fill="#5964E0"
                fillRule="nonzero"
              />
            </svg>
            <input
              id="keywordSearchInput"
              name="mainSearch"
              className="color-primary-switch-100 bg-neutral-100"
              type="text"
              placeholder="Filter by title, companies, technologies.."
            />
          </div>
          <div className="location-filter-container | bg-neutral-100">
            <svg width="17" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.358 2.451A8.3 8.3 0 008.448 0a8.3 8.3 0 00-5.911 2.451c-2.922 2.925-3.285 8.427-.786 11.76l6.697 9.683 6.687-9.669c2.508-3.347 2.145-8.85-.777-11.774zm-5.833 8.894a3.057 3.057 0 01-3.051-3.054 3.057 3.057 0 013.05-3.055 3.057 3.057 0 013.052 3.055 3.057 3.057 0 01-3.051 3.054z"
                fill="#5964E0"
                fillRule="nonzero"
              />
            </svg>
            <input
              id="locationSearchInput"
              name="locationSearch"
              className="color-primary-switch-100 bg-neutral-100"
              type="text"
              placeholder="Filter by location.."
            />
          </div>
          <div className="submition-container | bg-neutral-100">
            <div>
              <label class="custom-checkbox-container | color-primary-switch-100 fw-bold">
                Full Time <span class="dynamic-text">Only</span>
                <input
                  type="checkbox"
                  checked={jobContractFilter}
                  onChange={() => setJobContractFilter(!jobContractFilter)}
                />
                <span class="checkmark"></span>
              </label>
            </div>
            <button className="button" data-type="main-search-btn">
              Search
            </button>
          </div>
          <div className="mobile-search-input-container">
            <input
              className="color-primary-switch-100 bg-neutral-100"
              name="mobileMainSearch"
              type="text"
              placeholder="Filter by title.."
            />
          </div>
          <div className="mobile-search-icons-container">
            <div
              className="mobile-search-location-filter-icon-container"
              onClick={() => setShowMobileSearchModal(true)}
            >
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z"
                  fill="#6E8098"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            <MobileSearchModal
              onClose={() => setShowMobileSearchModal(false)}
              show={showMobileSearchModal}
              handleSearch={handleSearch}
            />
            <button
              className="button-search-mobile | button"
              data-type="square"
            >
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z"
                  fill="#FFFF"
                  fillRule="nonzero"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
