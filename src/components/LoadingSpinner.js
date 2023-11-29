import React from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export function LoadingSpinner({ loading }) {
  return (
    <div className="loading-spinner-container">
      <BarLoader
        css={override}
        loading={loading}
        color={"#36D7B7"} // You can customize the color
        size={150} // You can customize the size
      />
    </div>
  );
}
