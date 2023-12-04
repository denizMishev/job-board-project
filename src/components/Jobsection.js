import { JobCard } from "./JobCard";

import { useErrorBoundary } from "react-error-boundary";

import { useEffect, useState } from "react";
import { database, jobsCollection } from "../firebaseConfig";
import { collection, getDocs, query, where } from "@firebase/firestore";

import { useSearch } from "../context/SearchContext";

import { LoadingSpinner } from "./LoadingSpinner";
import { NoSearchResults } from "./NoSearchResults";
import { PageSelector } from "./PageSelector";

export function JobSection() {
  const { showBoundary } = useErrorBoundary([]);

  console.log("render");
  const {
    searchQuery,
    mainSearchQuery,
    locationSearchQuery,
    mobileLocationSearchQuery,
    jobContractFilter,
  } = useSearch();

  const databaseCollection = collection(database, jobsCollection);
  const fullTimeJobsQuery = query(
    databaseCollection,
    where("contract", "==", "Full Time")
  );

  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

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
    getDocs(jobContractFilter ? fullTimeJobsQuery : databaseCollection)
      .then((response) => {
        const jobs = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllJobs(jobs);
        if (jobContractFilter) setCurrentPage(1);
      })
      .catch((error) => {
        showBoundary(error);
      });
  }, [jobContractFilter]);

  useEffect(() => {
    if (mainSearchQuery || locationSearchQuery || mobileLocationSearchQuery) {
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

      console.log(filteredJobs);

      setCurrentPage(1);
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
