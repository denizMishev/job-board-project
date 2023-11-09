import { Jobcard } from "./Jobcard";

import { jobsData } from "../data/data";
import { useState } from "react";

export function Jobsection() {
  const [displayJobsAmount, setDisplayJobsAmount] = useState(9);

  const loadMoreHandler = () => {
    setDisplayJobsAmount(
      displayJobsAmount >= jobsData.length
        ? displayJobsAmount
        : displayJobsAmount + 9
    );
  };

  console.log(displayJobsAmount);

  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          <div className="jobs-grid">
            {jobsData.slice(0, displayJobsAmount).map((jobData) => (
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
            onClick={() => loadMoreHandler()}
            className="jobs-load-more-button | button"
          >
            Load More
          </button>
        </div>
      </section>
    </main>
  );
}
