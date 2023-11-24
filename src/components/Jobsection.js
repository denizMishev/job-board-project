import { Jobcard } from "./Jobcard";

import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

import { useSearch } from "../Context/SearchContext";

import { returnPaginationRange } from "../utils/utils";

export function Jobsection() {
  const { searchQuery } = useSearch();
  const jobsFirestoreCollection = collection(database, "jobs2");

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("onPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [displayJobs, setDisplayJobs] = useState([]);
  console.log(currentPage);

  const pageChangeHandler = (value) => {
    localStorage.setItem("onPage", value);
    setCurrentPage(value);
  };

  useEffect(() => {
    let currentJobs;
    getDocs(jobsFirestoreCollection)
      .then((response) => {
        const jobsData = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (searchQuery) {
          let filteredJobs = jobsData.filter((job) => {
            const mainSearchQuery = searchQuery.mainSearch?.toLowerCase() || "";
            const locationSearchQuery =
              searchQuery.locationSearch?.toLowerCase() || "";
            const mobileLocationSearchQuery =
              searchQuery.mobileLocationSearch?.toLowerCase() || "";

            const matchesMainSearchQuery =
              mainSearchQuery === "" ||
              job.company.toLowerCase().includes(mainSearchQuery) ||
              job.description.toLowerCase().includes(mainSearchQuery) ||
              job.position.toLowerCase().includes(mainSearchQuery) ||
              job.requirements.items.some((requirement) =>
                requirement.toLowerCase().includes(mainSearchQuery)
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

          currentJobs = filteredJobs;
          pageChangeHandler(1);
        } else {
          currentJobs = jobsData;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = currentJobs.slice(startIndex, endIndex);
        setDisplayJobs(pageData);
        setTotalPages(Math.ceil(currentJobs.length / itemsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line
  }, [searchQuery, currentPage]);

  let arrayOfPages = returnPaginationRange(
    totalPages,
    currentPage,
    itemsPerPage,
    1
  );

  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          <div className="jobs-grid">
            {displayJobs.map((jobData) => (
              <Jobcard
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
