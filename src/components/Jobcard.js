import { Link } from "react-router-dom";
// import { ReactSVG } from "react-svg";

// import scoot from "../logos/scoot.svg";
// import blogr from "../logos/blogr.svg";
// import vector from "../logos/vector.svg";
// import officelite from "../logos/officelite.svg";
// import pod from "../logos/pod.svg";
// import creative from "../logos/creative.svg";
// import pomodoro from "../logos/pomodoro.svg";
// import maker from "../logos/maker.svg";
// import coffeeroasters from "../logos/coffeeroasters.svg";

export function Jobcard({
  jobId,
  company,
  logoImage,
  logoBackgroundColor,
  position,
  postedAt,
  workingTime,
  location,
}) {
  return (
    <Link className="display-block" to={`/jobs/${jobId}`}>
      <article className="job-card bg-neutral-100">
        <div
          className="job-logo-container"
          style={{ backgroundColor: logoBackgroundColor }}
        >
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="12">
            <path
              fill="#FFF"
              d="M3.648 11.424c1.045 0 1.856-.235 2.432-.704.576-.47.864-1.099.864-1.888v-.096c0-.715-.256-1.272-.768-1.672-.512-.4-1.173-.643-1.984-.728-.704-.075-1.19-.168-1.456-.28-.267-.112-.4-.296-.4-.552 0-.181.085-.333.256-.456.17-.123.427-.184.768-.184.373 0 .677.083.912.248.235.165.4.392.496.68l1.824-.736a3.533 3.533 0 00-.368-.696 2.777 2.777 0 00-.624-.656 3.153 3.153 0 00-.936-.48c-.368-.123-.803-.184-1.304-.184-.384 0-.757.053-1.12.16a2.99 2.99 0 00-.96.472 2.477 2.477 0 00-.672.76 2.06 2.06 0 00-.256 1.04v.096c0 .757.264 1.33.792 1.72.528.39 1.24.621 2.136.696.33.032.605.075.824.128.219.053.392.12.52.2.128.08.216.165.264.256.048.09.072.19.072.296 0 .181-.093.35-.28.504-.187.155-.53.232-1.032.232-.565 0-.984-.128-1.256-.384a1.819 1.819 0 01-.536-.896L0 8.928c.053.277.157.563.312.856.155.293.376.56.664.8.288.24.65.44 1.088.6.437.16.965.24 1.584.24zm8.196 0c1.13 0 2.035-.288 2.712-.864.677-.576 1.107-1.333 1.288-2.272l-1.984-.496c-.096.523-.307.939-.632 1.248-.325.31-.797.464-1.416.464-.288 0-.56-.045-.816-.136a1.881 1.881 0 01-.672-.408 1.931 1.931 0 01-.456-.68 2.442 2.442 0 01-.168-.936v-.096c0-.352.056-.67.168-.952.112-.283.264-.523.456-.72.192-.197.416-.35.672-.456a2.1 2.1 0 01.816-.16c.619 0 1.099.17 1.44.512.341.341.544.747.608 1.216l1.984-.512c-.181-.939-.616-1.696-1.304-2.272-.688-.576-1.587-.864-2.696-.864-.576 0-1.117.096-1.624.288a3.89 3.89 0 00-1.328.832c-.379.363-.675.8-.888 1.312-.213.512-.32 1.088-.32 1.728v.192c0 .64.107 1.21.32 1.712.213.501.507.923.88 1.264.373.341.813.603 1.32.784a4.832 4.832 0 001.64.272zm8.196 0c.544 0 1.064-.09 1.56-.272a3.999 3.999 0 001.32-.792 3.73 3.73 0 00.912-1.28c.224-.507.336-1.09.336-1.752v-.192c0-.65-.112-1.23-.336-1.736a3.815 3.815 0 00-.912-1.288 3.93 3.93 0 00-1.32-.8 4.507 4.507 0 00-1.56-.272c-.544 0-1.064.09-1.56.272a3.93 3.93 0 00-1.32.8 3.815 3.815 0 00-.912 1.288c-.224.507-.336 1.085-.336 1.736v.192c0 .661.112 1.245.336 1.752.224.507.528.933.912 1.28s.824.61 1.32.792a4.507 4.507 0 001.56.272zm0-1.92c-.288 0-.56-.048-.816-.144a1.98 1.98 0 01-.672-.416 1.964 1.964 0 01-.456-.664 2.234 2.234 0 01-.168-.888v-.32c0-.33.056-.627.168-.888.112-.261.264-.483.456-.664a1.98 1.98 0 01.672-.416c.256-.096.528-.144.816-.144.288 0 .56.048.816.144.256.096.48.235.672.416.192.181.344.403.456.664.112.261.168.557.168.888v.32c0 .33-.056.627-.168.888a1.964 1.964 0 01-.456.664 1.98 1.98 0 01-.672.416 2.305 2.305 0 01-.816.144zm8.292 1.92c.544 0 1.064-.09 1.56-.272a3.999 3.999 0 001.32-.792 3.73 3.73 0 00.912-1.28c.224-.507.336-1.09.336-1.752v-.192c0-.65-.112-1.23-.336-1.736a3.815 3.815 0 00-.912-1.288 3.93 3.93 0 00-1.32-.8 4.507 4.507 0 00-1.56-.272c-.544 0-1.064.09-1.56.272a3.93 3.93 0 00-1.32.8A3.815 3.815 0 0024.54 5.4c-.224.507-.336 1.085-.336 1.736v.192c0 .661.112 1.245.336 1.752.224.507.528.933.912 1.28s.824.61 1.32.792a4.507 4.507 0 001.56.272zm0-1.92c-.288 0-.56-.048-.816-.144a1.98 1.98 0 01-.672-.416 1.964 1.964 0 01-.456-.664 2.234 2.234 0 01-.168-.888v-.32c0-.33.056-.627.168-.888.112-.261.264-.483.456-.664a1.98 1.98 0 01.672-.416c.256-.096.528-.144.816-.144.288 0 .56.048.816.144.256.096.48.235.672.416.192.181.344.403.456.664.112.261.168.557.168.888v.32c0 .33-.056.627-.168.888a1.964 1.964 0 01-.456.664 1.98 1.98 0 01-.672.416 2.305 2.305 0 01-.816.144zM39.696 11.2V9.28h-2.144c-.288 0-.432-.16-.432-.48V5.184h2.864v-1.92H37.12V0h-2.016v3.264h-2.352v1.92h2.352v4.768c0 .363.115.661.344.896.23.235.525.352.888.352h3.36z"
            />
          </svg> */}
          {/* <img src={"../logos/vector.svg"} /> */}
          {/* <img src={vector} /> */}
          {/* <img src={dynamicSvg}></img> */}
          {/* <img alt={`${company} logo`} src={require(`${logoImage}`)} /> */}
          <img
            alt={`${company} logo`}
            src={require(`../logos/${company.toLowerCase()}.svg`)}
          />
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
