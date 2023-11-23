import { Jobcard } from "./Jobcard";
import { jobsData } from "../data/data";

import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

import { useSearch } from "../Context/SearchContext";

export function Jobsection() {
  const { searchQuery } = useSearch();
  const jobsFirestoreCollection = collection(database, "jobs");

  // const [displayJobsAmount, setDisplayJobsAmount] = useState(12);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayJobs, setDisplayJobs] = useState([]);

  // const loadMoreHandler = () => {
  //   setDisplayJobsAmount(
  //     displayJobsAmount >= jobsData.length
  //       ? displayJobsAmount
  //       : displayJobsAmount + 9
  //   );
  // };

  // useEffect(() => {
  //   getDocs(jobsFirestoreCollection)
  //     .then((response) => {
  //       const jobsData = response.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       if (searchQuery) {
  //         let filteredJobs = jobsData.filter((job) => {
  //           const mainSearchQuery = searchQuery.mainSearch?.toLowerCase() || "";
  //           const locationSearchQuery =
  //             searchQuery.locationSearch?.toLowerCase() || "";

  //           const matchesMainSearchQuery =
  //             mainSearchQuery === "" ||
  //             job.company.toLowerCase().includes(mainSearchQuery) ||
  //             job.description.toLowerCase().includes(mainSearchQuery) ||
  //             job.position.toLowerCase().includes(mainSearchQuery) ||
  //             job.requirements.items.some((requirement) =>
  //               requirement.toLowerCase().includes(mainSearchQuery)
  //             );

  //           const matchesLocationSearchQuery =
  //             locationSearchQuery === "" ||
  //             job.location.toLowerCase().includes(locationSearchQuery);

  //           return matchesMainSearchQuery && matchesLocationSearchQuery;
  //         });

  //         setDisplayJobs(filteredJobs);
  //       } else {
  //         setDisplayJobs(jobsData);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [searchQuery]);

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

            return matchesMainSearchQuery && matchesLocationSearchQuery;
          });

          // setDisplayJobs(filteredJobs);
          currentJobs = filteredJobs;
        } else {
          // setDisplayJobs(jobsData);
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
  }, [searchQuery, currentPage]);

  // const loadPage = () => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const pageData = displayJobs.slice(startIndex, endIndex);
  //   return pageData;
  // };

  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const pageData = displayJobs.slice(startIndex, endIndex);
  //   setDisplayJobs(pageData);
  // }, [currentPage]);

  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          {/* <div className="jobs-grid">
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
          </div> */}
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
          {/* <button
            onClick={loadMoreHandler}
            className="jobs-load-more-button | button"
          >
            Load More
          </button> */}
          {totalPages > 1 && (
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
          )}
        </div>
      </section>
    </main>
  );
}

// import { Jobcard } from "./Jobcard";

// import { useEffect, useState } from "react";
// import { database } from "../firebaseConfig";
// import { collection, getDocs } from "@firebase/firestore";

// import { useSearch } from "../Context/SearchContext";

// export function Jobsection() {
//   const { searchQuery } = useSearch();
//   const jobsFirestoreCollection = collection(database, "jobs");

//   // Constants for paging
//   const itemsPerPage = 12;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [displayJobs, setDisplayJobs] = useState([]);

//   // Calculate total pages based on the total number of jobs and items per page
//   const totalPages = Math.ceil(jobsData.length / itemsPerPage);

//   // Function to load a specific page
//   const loadPage = (page) => {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const pageData = displayJobs.slice(startIndex, endIndex);
//     setDisplayJobs(pageData);
//   };

//   // Click handler for "Load More" button
//   const loadMoreHandler = () => {
//     // Only increment the page if there are more pages to display
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Effect to fetch data from Firestore and filter based on search queries
//   useEffect(() => {
//     getDocs(jobsFirestoreCollection)
//       .then((response) => {
//         const jobsData = response.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         let displayData = jobsData.filter((job) => {
//           const mainSearchQuery = searchQuery.mainSearch?.toLowerCase() || "";
//           const locationSearchQuery =
//             searchQuery.locationSearch?.toLowerCase() || "";

//           const matchesMainSearchQuery =
//             mainSearchQuery === "" ||
//             job.company.toLowerCase().includes(mainSearchQuery) ||
//             job.description.toLowerCase().includes(mainSearchQuery) ||
//             job.position.toLowerCase().includes(mainSearchQuery) ||
//             job.requirements.items.some((requirement) =>
//               requirement.toLowerCase().includes(mainSearchQuery)
//             );

//           const matchesLocationSearchQuery =
//             locationSearchQuery === "" ||
//             job.location.toLowerCase().includes(locationSearchQuery);

//           return matchesMainSearchQuery && matchesLocationSearchQuery;
//         });

//         // Set the displayData and reset to the first page when search query changes
//         setDisplayJobs(displayData);
//         setCurrentPage(1);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [searchQuery, jobsFirestoreCollection]);

//   // Effect to load the current page when currentPage or displayJobs change
//   useEffect(() => {
//     loadPage(currentPage);
//   }, [currentPage, displayJobs]);

//   return (
//     <main>
//       <section className="landingpage-jobs | bg-neutral-200">
//         <div className="jobs-container | container">
//           <div className="jobs-grid">
//             {displayJobs.map((jobData) => (
//               <Jobcard
//                 key={jobData.id}
//                 jobId={jobData.id}
//                 company={jobData.company}
//                 logoImage={jobData.logo}
//                 logoBackgroundColor={jobData.logoBackground}
//                 position={jobData.position}
//                 postedAt={jobData.postedAt}
//                 workingTime={jobData.contract}
//                 location={jobData.location}
//               />
//             ))}
//           </div>
//           {/* Render pagination info and "Load More" button if there are multiple pages */}
//           {totalPages > 1 && (
//             <div>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={loadMoreHandler}
//                 className="jobs-load-more-button | button"
//               >
//                 Load More
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }
