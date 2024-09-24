export function PageSelector({ totalPages, currentPage, setCurrentPage }) {
  const pageChangeHandler = (value) => {
    localStorage.setItem("onPage", value);
    setCurrentPage(value);
  };

  return (
    <div className="pagination-container">
      <div className="pagination-container-inner">
        <div
          style={{ visibility: currentPage === 1 ? "hidden" : "unset" }}
          onClick={() => pageChangeHandler(currentPage - 1)}
          className="pagination-arrowsvg-containers | color-primary-switch-100 bg-neutral-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
        </div>
        <ul className="jobsection-pages-list | bg-neutral-100">
          {Array.from({ length: totalPages }, (_, index) => {
            const isCurrent = currentPage === index + 1;
            const isInRange =
              index + 1 === 1 ||
              index + 1 === totalPages ||
              (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1);

            if (isInRange) {
              return (
                <li
                  className={
                    isCurrent
                      ? "page-list-item | color-primary-200 fw-bold"
                      : "page-list-item | color-primary-switch-100"
                  }
                  onClick={() => pageChangeHandler(index + 1)}
                  key={index + 1}
                >
                  <span>{index + 1}</span>
                </li>
              );
            } else if (
              index + 1 === currentPage - 2 ||
              index + 1 === currentPage + 2
            ) {
              return (
                <li
                  className="page-dots | page-list-item color-primary-switch-100"
                  key={index + 1}
                >
                  <span>...</span>
                </li>
              );
            }

            return null;
          })}
        </ul>
        <div
          style={{
            visibility: currentPage == totalPages ? "hidden" : "unset",
          }}
          onClick={() => pageChangeHandler(currentPage + 1)}
          className="pagination-arrowsvg-containers | color-primary-switch-100 bg-neutral-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
