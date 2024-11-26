import { useNavigate } from "react-router-dom";

export function ErrorHandler({ error, componentStack, resetErrorBoundary }) {
  const navigate = useNavigate();

  const errorHandler = () => {
    if (error.type === "URL_ERR") {
      navigate("/");
      resetErrorBoundary();
    } else {
      resetErrorBoundary();
    }
  };

  return (
    <main className="flex-row-center">
      <section className="error-handler-container | fs-250 flex-col-center">
        <div className="error-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>
        </div>
        <span className="display-block color-primary-switch-100">
          Something went wrong here..
        </span>
        <span className="display-block color-primary-switch-100">
          {error.message}
        </span>
        <button className="button" onClick={errorHandler}>
          {error.type === "URL_ERR" ? "Go to Home Page" : "Reload Page"}
        </button>
      </section>
    </main>
  );
}
