import { Jobcard } from "./Jobcard";

import { jobsData } from "../data/data";

export function Jobsection() {
  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          <div className="jobs-grid">
            {/* <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard> */}
            {jobsData.map((jobData) => (
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
          <button className="jobs-load-more-button | button">Load More</button>
        </div>
      </section>
    </main>
  );
}
