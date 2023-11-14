export function SearchModalMobile() {
  return (
    <div class="modal">
      <div className="location-filter-container | bg-neutral-100">
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
        />
      </div>
      <div className="submition-container | bg-neutral-100">
        <div>
          <input type="checkbox" />
          <label className="color-primary-switch-100 fw-bold">
            Full Time <span className="dynamic-text">Only</span>
          </label>
        </div>
        <button className="button" data-type="main-search-btn">
          Search
        </button>
      </div>
    </div>
  );
}
