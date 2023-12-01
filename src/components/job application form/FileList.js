export function FileList({ uploadingFiles, handleFileDeletion }) {
  return (
    <ul className="uploadedfiles-list">
      {uploadingFiles.map((uploadingFile) => (
        <li className="uploadedfiles-file" key={uploadingFile.name}>
          <div
            onClick={() => handleFileDeletion(uploadingFile)}
            className="delete-uploaded-file-button-container"
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
          <div className="file-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
              />
            </svg>
          </div>
          <div className="file-name-and-progress-container">
            <span className="file-name | display-block">
              {uploadingFile.name}
            </span>
            {uploadingFile.errorMessage ? (
              <span className="display-block color-red fs-100">
                {uploadingFile.errorMessage}
              </span>
            ) : (
              <>
                <progress
                  className="display-block"
                  value={uploadingFile.progress}
                  max="100"
                ></progress>
                <span className="upload-progress-number | display-block">
                  {uploadingFile.progress}%
                </span>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
