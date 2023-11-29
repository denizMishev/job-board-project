import React from "react";
import { css } from "@emotion/react";
import { RotateLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;

export function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <RotateLoader css={override} color={"#36D7B7"} size={20} />
    </div>
  );
}
