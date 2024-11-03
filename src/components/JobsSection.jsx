import { JobCard } from "./JobCard.tsx";

import { useErrorBoundary } from "react-error-boundary";

import { useEffect, useState } from "react";
import { getJobs } from "../api/getJobs.js";

import { useSearch } from "../context/SearchContext.jsx";

import { LoadingSpinner } from "./LoadingSpinner.jsx";
import { NoSearchResults } from "./NoSearchResults.jsx";
import { PageSelector } from "./PageSelector.jsx";

import { filterObject } from "../helpers/filterObject.js";

export function JobsSection() {
  const { showBoundary } = useErrorBoundary([]);

  const {
    searchQuery,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
    jobContractFilter,
  } = useSearch();

  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [filteredAndPaginatedJobs, setFilteredAndPaginatedJobs] = useState([]);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("onPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const paginateData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    (async () => {
      try {
        const filter = jobContractFilter
          ? { field: "contract", operator: "==", value: "Full Time" }
          : null;

        const jobs = await getJobs(filter);
        setAllJobs(jobs);

        if (jobContractFilter) setCurrentPage(1);
      } catch (error) {
        showBoundary(error);
      }
    })();
  }, [jobContractFilter]);

  useEffect(() => {
    if (mainSearchQuery || locationSearchQuery || mobileLocationSearchQuery) {
      let filteredJobs = allJobs;

      if (mainSearchQuery) {
        filteredJobs = filterObject(
          filteredJobs,
          [
            "company",
            "position",
            "location",
            "description",
            "requirements.content",
            "requirements.items",
            "role.content",
            "role.items",
          ],
          mainSearchQuery
        );
      }

      if (mobileLocationSearchQuery) {
        filteredJobs = filterObject(
          filteredJobs,
          ["location"],
          mobileLocationSearchQuery
        );
      } else if (locationSearchQuery) {
        filteredJobs = filterObject(
          filteredJobs,
          ["location"],
          locationSearchQuery
        );
      }

      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      setDisplayJobs(filteredJobs);
      setTotalPages(Math.ceil(filteredJobs.length / itemsPerPage));
    } else {
      setDisplayJobs(allJobs);
      setCurrentPage(1);
      setTotalPages(Math.ceil(allJobs.length / itemsPerPage));
    }
  }, [
    allJobs,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
  ]);

  useEffect(() => {
    setFilteredAndPaginatedJobs(
      paginateData(displayJobs, currentPage, itemsPerPage)
    );
  }, [currentPage, displayJobs]);

  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          {allJobs.length < 1 && <LoadingSpinner></LoadingSpinner>}
          {searchQuery && displayJobs.length < 1 && (
            <NoSearchResults></NoSearchResults>
          )}
          {displayJobs.length >= 1 && (
            <div className="jobs-grid">
              {filteredAndPaginatedJobs.map((jobData) => (
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
                ></JobCard>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <PageSelector
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></PageSelector>
          )}
        </div>
      </section>
    </main>
  );
}
