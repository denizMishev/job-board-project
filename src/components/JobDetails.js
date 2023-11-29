import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { SuccessAnnouncementModal } from "./SuccessAnnouncementModal";

import { database } from "../firebaseConfig";
import { getDoc, doc } from "@firebase/firestore";

import { JobApplyModal } from "./job application form/JobApplyModal";

export function JobDetails() {
  const collectionName = "jobs";
  const { jobId } = useParams();

  const [jobData, setJobData] = useState(null);

  const [showJobApplyModal, setShowJobApplyModal] = useState(false);
  const [showSuccessAnnouncement, setShowSuccessAnnouncement] = useState(false);

  const docRef = doc(database, collectionName, jobId);

  useEffect(() => {
    getDoc(docRef).then((doc) => {
      setJobData(doc.data());
    });
    // eslint-disable-next-line
  }, []);

  return (
    <main className="bg-neutral-200">
      <section className="jobdetails bg-neutral-200">
        <div className="jobdetails-container | container">
          <SuccessAnnouncementModal
            onClose={() => setShowSuccessAnnouncement(false)}
            show={showSuccessAnnouncement}
            positionName={jobData?.position}
          ></SuccessAnnouncementModal>

          <JobApplyModal
            positionName={jobData?.position}
            onClose={() => setShowJobApplyModal(false)}
            show={showJobApplyModal}
            showSuccessAnnouncement={() => setShowSuccessAnnouncement(true)}
          />
          <header className="jobdetails-header | bg-neutral-100">
            <div className="jobdetails-header-container">
              <div className="jobdetails-image-and-company-container">
                <div
                  className="jobdetails-header-image-container"
                  style={{ backgroundColor: jobData?.logoBackground }}
                >
                  {/* {jobData ? (
                    <img
                      alt={`${jobData.company} logo`}
                      src={require(`../logos/${jobData.company
                        .replace(/\s/g, "")
                        .toLowerCase()}.svg`)}
                    />
                  ) : (
                    ""
                  )} */}
                </div>
                <div className="jobdetails-header-company-container">
                  <h2 className="jobdetails-header-company-title | fs-300 fw-bold color-primary-switch-100">
                    {jobData?.company}
                  </h2>
                  <span className="jobdetails-header-company-website | color-accent-200 fs-100">
                    {jobData?.company}.com
                  </span>
                </div>
              </div>
              <div className="jobdetails-header-button-container">
                <a
                  href={jobData?.website}
                  className="button"
                  data-type="inverted"
                >
                  Company Site
                </a>
              </div>
            </div>
          </header>

          <article className="jobdetails-info | bg-neutral-100 color-accent-200">
            <div className="jobdetails-info-container">
              <div className="jobdetails-info-company-container">
                <div className="jobdetails-company-details-container">
                  <span>{jobData?.postedAt}</span>
                  <span>{jobData?.contract}</span>
                  <h2 className="color-primary-switch-100 fw-bold fs-350">
                    {jobData?.position}
                  </h2>
                  <span className="color-primary-200 fw-bold">
                    {jobData?.location}
                  </span>
                </div>
                <div className="jobdetails-applynow-container">
                  <button
                    onClick={() => setShowJobApplyModal(true)}
                    className="button"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="jobdetails-info-description-1-container">
                <p className="lh-200">{jobData?.description}</p>
              </div>

              <div className="jobdetails-info-requirements-container">
                <h6 className="color-primary-switch-100 fw-bold fs-250">
                  Requirements
                </h6>
                <p className="lh-200">{jobData?.requirements.content}</p>
                <ul className="jobdetails-ul">
                  {jobData?.requirements.items.map((reqItem, index) => (
                    <li key={index}>
                      <span>{reqItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="jobdetails-info-description-2-container">
                <h6 className="color-primary-switch-100 fw-bold fs-250">
                  What You Will Do
                </h6>
                <p className="lh-200">{jobData?.role.content}</p>
                <ol className="jobdetails-ol">
                  {jobData?.role.items.map((reqItem, index) => (
                    <li key={index}>
                      <span>{reqItem}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        </div>
        <footer className="jobdetails-footer | bg-neutral-100">
          <div className="jobdetails-footer-container">
            <div className="footer-company-info-container">
              <h2 className="color-primary-switch-100 fw-bold fs-250">
                {jobData?.position}
              </h2>
              <span className="color-accent-200">{jobData?.company}</span>
            </div>
            <div className="footer-applynow-container">
              <button className="button">Apply Now</button>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
