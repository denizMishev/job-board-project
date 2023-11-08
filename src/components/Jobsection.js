import { Jobcard } from "./Jobcard";

export function Jobsection() {
  return (
    <main>
      <section className="landingpage-jobs | bg-neutral-200">
        <div className="jobs-container | container">
          <div className="jobs-grid">
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
            <Jobcard></Jobcard>
          </div>
          <button className="jobs-load-more-button | button">Load More</button>
        </div>
      </section>
    </main>
  );
}
