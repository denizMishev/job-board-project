import { FadeLoader } from "react-spinners";

export function LoadingSpinner() {
  return (
    <div className="loading-spinner | flex-col-center">
      <div
        className="loading-spinner-container"
        style={{
          display: "block",
          margin: "0 auto",
        }}
      >
        <FadeLoader color={"#5762e0"} height={25} margin={5} />
      </div>
      <span className="loading-spinner-text | display-block color-primary-switch-100">
        Loading data...
      </span>
    </div>
  );
}
