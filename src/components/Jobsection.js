import { Jobcard } from "./Jobcard";
import { jobsData } from "../data/data";

import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

import { useSearch } from "../Context/SearchContext";

export function Jobsection() {
  const { searchQuery } = useSearch();
  const collectionRef = collection(database, "jobs");

  const [displayJobsAmount, setDisplayJobsAmount] = useState(9);
  const [displayJobs, setDisplayJobs] = useState([]);

  const loadMoreHandler = () => {
    setDisplayJobsAmount(
      displayJobsAmount >= jobsData.length
        ? displayJobsAmount
        : displayJobsAmount + 9
    );
  };

  // useEffect(() => {
  //   let displayData = jobsData.filter((job) => {
  //     const mainSearchQuery = searchQuery.mainSearch?.toLowerCase() || "";
  //     const locationSearchQuery =
  //       searchQuery.locationSearch?.toLowerCase() || "";

  //     const matchesMainSearchQuery =
  //       mainSearchQuery === "" ||
  //       job.company.toLowerCase().includes(mainSearchQuery) ||
  //       job.position.toLowerCase().includes(mainSearchQuery) ||
  //       job.requirements.items.some((requirement) =>
  //         requirement.toLowerCase().includes(mainSearchQuery)
  //       );

  //     const matchesLocationSearchQuery =
  //       locationSearchQuery === "" ||
  //       job.location.toLowerCase().includes(locationSearchQuery);

  //     return matchesMainSearchQuery && matchesLocationSearchQuery;
  //   });

  //   setDisplayJobs(displayData);
  // }, [searchQuery]);

  useEffect(() => {
    const getData = () => {
      getDocs(collectionRef)
        .then((response) => {
          const jobsData = response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // let displayData = jobsData.filter((job) => {
          //
          // });
          console.log(jobsData);
          setDisplayJobs(jobsData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    getData();
  }, []);

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
