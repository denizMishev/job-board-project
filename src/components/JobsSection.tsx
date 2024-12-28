import { useEffect, useState } from "react";

import { useErrorBoundary } from "react-error-boundary";

import { JobCard } from "./JobCard.js";
import { LoadingSpinner } from "./LoadingSpinner.js";
import { NoSearchResults } from "./NoSearchResults.js";
import { PageSelector } from "./PageSelector.jsx";

import { getJobs } from "../api/getJobs.js";

import { useSearch } from "../context/SearchContext.jsx";

import { filterObject } from "../helpers/filterObject.js";

import { JobProps } from "../types/JobProps.js";

const ITEMS_PER_PAGE = 9;

interface FilterObject {
  field: string;
  operator: string;
  value: string;
}

export function JobsSection() {
  const { showBoundary } = useErrorBoundary();

  const {
    searchQuery,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
    jobContractFilter,
  } = useSearch();

  const [allJobs, setAllJobs] = useState<JobProps[]>([]);
  const [displayJobs, setDisplayJobs] = useState<JobProps[]>([]);
  const [filteredAndPaginatedJobs, setFilteredAndPaginatedJobs] = useState<
    JobProps[]
  >([]);

  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("onPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const paginateData = (
    data: JobProps[],
    page: number,
    ITEMS_PER_PAGE: number
  ) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    (async () => {
      try {
        const filter: FilterObject | undefined = jobContractFilter
          ? { field: "contract", operator: "==", value: "Full Time" }
          : undefined;

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
          filteredJobs as unknown as Record<string, unknown>[],
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
        ) as unknown as JobProps[];
      }

      if (mobileLocationSearchQuery) {
        filteredJobs = filterObject(
          filteredJobs as unknown as Record<string, unknown>[],
          ["location"],
          mobileLocationSearchQuery
        ) as unknown as JobProps[];
      } else if (locationSearchQuery) {
        filteredJobs = filterObject(
          filteredJobs as unknown as Record<string, unknown>[],
          ["location"],
          locationSearchQuery
        ) as unknown as JobProps[];
      }

      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      setDisplayJobs(filteredJobs);
      setTotalPages(Math.ceil(filteredJobs.length / ITEMS_PER_PAGE));
    } else {
      setDisplayJobs(allJobs);
      setCurrentPage(1);
      setTotalPages(Math.ceil(allJobs.length / ITEMS_PER_PAGE));
    }
  }, [
    allJobs,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
  ]);

  useEffect(() => {
    setFilteredAndPaginatedJobs(
      paginateData(displayJobs, currentPage, ITEMS_PER_PAGE)
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
                  id={jobData.id}
                  company={jobData.company}
                  logoBackground={jobData.logoBackground}
                  position={jobData.position}
                  postedAt={jobData.postedAt}
                  contract={jobData.contract}
                  location={jobData.location}
                ></JobCard>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <PageSelector
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
