import { useSearch } from "../context/SearchContext";

export function NoSearchResults() {
  const { setSearchQuery } = useSearch();

  const clearSearch = () => {
    const keywordSearchInput = document.getElementById("keywordSearchInput");
    const locationSearchInput = document.getElementById("locationSearchInput");
    keywordSearchInput.value = "";
    locationSearchInput.value = "";
    setSearchQuery("");
  };

  return (
    <div className="no-result-container | flex-col-center">
      <div className="no-results-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"
          />
        </svg>
      </div>
      <span className="display-block color-primary-switch-100 fs-350">
        We searched everywhere, but unfortunately
      </span>
      <span className="display-block color-primary-switch-100 fs-250">
        No results match this criteria
      </span>
      <span
        onClick={() => clearSearch()}
        className="display-block color-primary-200 fs-250 fw-bold"
      >
        Clear Search?
      </span>
    </div>
  );
}
