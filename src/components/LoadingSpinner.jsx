import React from "react";
import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;

export function LoadingSpinner() {
  return (
    <div className="loading-spinner | flex-col-center">
      <div className="loading-spinner-container">
        <FadeLoader
          css={override}
          color={"#5762e0"}
          height={25}
          margin={5}
        ></FadeLoader>
      </div>
      <span className="loading-spinner-text | display-block color-primary-switch-100">
        Loading data...
      </span>
    </div>
  );
}
