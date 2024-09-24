import { Link } from "react-router-dom";

export function JobCard({
  jobId,
  company,
  logoImage,
  logoBackgroundColor,
  position,
  postedAt,
  workingTime,
  location,
}) {
  const svgURL = new URL(
    `../assets/${company.replace(/\s/g, "").toLowerCase()}.svg`,
    import.meta.url
  ).href;

  return (
    <Link className="display-block" to={`/jobs/${jobId}`}>
      <article className="job-card bg-neutral-100">
        <div
          className="job-logo-container"
          style={{ backgroundColor: logoBackgroundColor }}
        >
          <img alt={`${company} logo`} src={svgURL} />
        </div>
        <div className="job-card-content">
          <div className="job-time-container | color-accent-200">
            <span>{postedAt}</span>
            <span>{workingTime}</span>
          </div>
          <h3 className="job-title | fs-250 fw-bold">{position}</h3>
          <span className="job-company | display-block color-accent-200">
            {company}
          </span>
          <span className="job-location | display-block fs-100 fw-bold color-primary-200">
            {location}
          </span>
        </div>
      </article>
    </Link>
  );
}
