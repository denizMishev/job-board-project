import { JobCard } from "./JobCard";

import { useEffect, useState } from "react";
import { database, jobsCollection } from "../firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

import { useSearch } from "../context/SearchContext";

import { returnPaginationRange } from "../utils/utils";
import { LoadingSpinner } from "./LoadingSpinner";
import { NoSearchResults } from "./NoSearchResults";

export function JobSection() {
  console.log("render");
  const {
    searchQuery,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
    setSearchQuery,
  } = useSearch();
  const databaseCollection = collection(database, jobsCollection);

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
    } else {
      setDisplayJobs(paginateData(allJobs, currentPage, itemsPerPage));
      setTotalPages(Math.ceil(allJobs.length / itemsPerPage));
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

  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          {allJobs.length < 1 && <LoadingSpinner></LoadingSpinner>}
          {searchQuery && displayJobs.length < 1 && (
            <NoSearchResults clearSearch={clearSearch}></NoSearchResults>
          )}
          {displayJobs.length > 1 && (
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
