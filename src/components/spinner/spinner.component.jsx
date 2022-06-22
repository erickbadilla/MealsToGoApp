import React, { Fragment } from "react";
import { LoadingContainer, LoadingIndicator } from "./spinner.styles";

export const Spinner = ({ isLoading, color, size }) => (
  <Fragment>
    {isLoading && (
      <LoadingContainer>
        <LoadingIndicator animating={true} size={size} color={color} />
      </LoadingContainer>
    )}
  </Fragment>
);
