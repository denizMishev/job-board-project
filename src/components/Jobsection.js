import { Jobcard } from "./Jobcard";
import { jobsData } from "../data/data";

import { useEffect, useState } from "react";

import { useSearch } from "../Context/SearchContext";

export function Jobsection() {
  const { searchQuery } = useSearch();

  const [displayJobsAmount, setDisplayJobsAmount] = useState(9);
  const [displayJobs, setDisplayJobs] = useState(jobsData);

  const loadMoreHandler = () => {
    setDisplayJobsAmount(
      displayJobsAmount >= jobsData.length
        ? displayJobsAmount
        : displayJobsAmount + 9
    );
  };

  useEffect(() => {
    let displayData = jobsData.filter((job) => {
      const lowerSearchQuery = searchQuery.toLowerCase();

      return (
        lowerSearchQuery === "" ||
        job.company.toLowerCase().includes(lowerSearchQuery) ||
        job.position.toLowerCase().includes(lowerSearchQuery) ||
        job.requirements.items.some((requirement) =>
          requirement.toLowerCase().includes(lowerSearchQuery)
        )
      );
    });

    setDisplayJobs(displayData);
  }, [searchQuery]);

  console.log("render");

  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          <div className="jobs-grid">
            {displayJobs.slice(0, displayJobsAmount).map((jobData) => (
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
          <button
            onClick={loadMoreHandler}
            className="jobs-load-more-button | button"
          >
            Load More
          </button>
        </div>
      </section>
    </main>
  );
}
