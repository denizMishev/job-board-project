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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayJobs, setDisplayJobs] = useState([]);

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

  let arrayTest = returnPaginationRange(
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

          {/* {totalPages > 1 && (
            <div className="pagination-container">
              <ul className="jobsection-pages-list">
                {[...Array(totalPages).keys()].map((page) => (
                  <li key={page + 1} className="page-list-item">
                    <button onClick={() => setCurrentPage(page + 1)}>
                      {page + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {totalPages > 1 && (
            <div className="pagination-container">
              <ul className="jobsection-pages-list">
                <li>
                  <span>btn</span>
                </li>
                <li>
                  <span>btn</span>
                </li>

                {arrayTest.map((value) => (
                  <li onClick={() => setCurrentPage(value)} key={value}>
                    <span>{value}</span>
                  </li>
                ))}

                <li>
                  <span>btn</span>
                </li>
                <li>
                  <span>btn</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
