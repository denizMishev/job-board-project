export function SuccessAnnouncementModal({ onClose, show, positionName }) {
  console.log(show);
  if (!show) {
    return null;
  }

  return (
    <div onClick={onClose} className="modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="success-modal | modal-content bg-neutral-100"
      >
        <div
          className="success-modal-close-icon-container | close-button-container"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
        <div className="success-modal-container | flex-col-center">
          <div className="success-icon-container | flex-row-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
              />
            </svg>
          </div>
          <div className="success-text-container | flex-col-center">
            <span className="fw-bold fs-350 color-primary-switch-100">
              Success!
            </span>
            <span className="color-primary-switch-100">
              You successfully applied for
            </span>
            <span className="fw-bold fs-250 color-primary-200">
              {positionName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
