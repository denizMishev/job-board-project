import { JobCard } from "./JobCard";

import { useEffect, useState } from "react";
import { database, jobsCollection } from "../firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

import { useSearch } from "../context/SearchContext";

import { returnPaginationRange } from "../utils/utils";
import { LoadingSpinner } from "./LoadingSpinner";

export function JobSection() {
  const {
    searchQuery,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
    setSearchQuery,
  } = useSearch();
  const databaseCollection = collection(database, jobsCollection);

  const [isLoading, setIsLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("onPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const pageChangeHandler = (value) => {
    localStorage.setItem("onPage", value);
    setCurrentPage(value);
  };

  const paginateData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    getDocs(databaseCollection).then((response) => {
      const jobs = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllJobs(jobs);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      let filteredJobs = allJobs.filter((job) => {
        const combinedJobString = `${job.company} ${job.position} ${
          job.location
        } ${job.description} ${job.requirements.content} ${
          job.role.content
        } ${job.requirements.items.join("")}${job.role.items.join(
          ""
        )}`.toLowerCase();

        const matchesMainSearchQuery =
          mainSearchQuery === "" ||
          mainSearchQuery
            .split(" ")
            .every((word) =>
              new RegExp(`\\b${word.toLowerCase()}\\b`).test(combinedJobString)
            );

        const matchesLocationSearchQuery =
          locationSearchQuery === "" ||
          job.location.toLowerCase().includes(locationSearchQuery);

        const matchesMobileLocationSearchQuery =
          mobileLocationSearchQuery === "" ||
          job.location.toLowerCase().includes(mobileLocationSearchQuery);

        if (mobileLocationSearchQuery) {
          return matchesMainSearchQuery && matchesMobileLocationSearchQuery;
        } else {
          return matchesMainSearchQuery && matchesLocationSearchQuery;
        }
      });

      setDisplayJobs(paginateData(filteredJobs, currentPage, itemsPerPage));
      setTotalPages(Math.ceil(filteredJobs.length / itemsPerPage));
      setIsLoading(false);
    } else {
      setDisplayJobs(paginateData(allJobs, currentPage, itemsPerPage));
      setTotalPages(Math.ceil(allJobs.length / itemsPerPage));
      setIsLoading(false);
    }
  }, [
    allJobs,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
    currentPage,
  ]);

  let arrayOfPages = returnPaginationRange(
    totalPages,
    currentPage,
    itemsPerPage,
    1
  );

  const clearSearch = () => {
    const keywordSearchInput = document.getElementById("keywordSearchInput");
    const locationSearchInput = document.getElementById("locationSearchInput");
    keywordSearchInput.value = "";
    locationSearchInput.value = "";
    setSearchQuery("");
  };

  console.log(isLoading);

  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : displayJobs.length < 1 ? (
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
                onClick={clearSearch}
                className="display-block color-primary-200 fs-250 fw-bold"
              >
                Clear Search?
              </span>
            </div>
          ) : (
            <div className="jobs-grid">
              {displayJobs.map((jobData) => (
                <JobCard
                  key={jobData.id}
                  jobId={jobData.id}
                  company={jobData.company}
                  logoImage={jobData.logo}
                  logoBackgroundColor={jobData.logoBackground}
                  position={jobData.position}
                  postedAt={jobData.postedAt}
                  workingTime={jobData.contract}
                  location={jobData.location}
                />
              ))}
            </div>
          )}
          {totalPages > 1 && (
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
                  {arrayOfPages.map((pageNumber) => {
                    if (pageNumber === currentPage) {
                      return (
                        <li
                          className="page-list-item | color-primary-200 fw-bold"
                          onClick={() => pageChangeHandler(pageNumber)}
                          key={pageNumber}
                        >
                          <span>{pageNumber}</span>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          className="page-list-item | color-primary-switch-100"
                          onClick={() => pageChangeHandler(pageNumber)}
                          key={pageNumber}
                        >
                          <span>{pageNumber}</span>
                        </li>
                      );
                    }
                  })}
                </ul>
                <div
                  style={{
                    visibility: currentPage === totalPages ? "hidden" : "unset",
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
          )}
        </div>
      </section>
    </main>
  );
}
