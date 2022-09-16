import React, { Fragment, FunctionComponent } from "react";

import { LoadingContainer, LoadingIndicator } from "./spinner.styles";

interface ISpinnerProps {
  isLoading: boolean;
  color: string;
  size: number;
}

export const Spinner: FunctionComponent<ISpinnerProps> = ({
  isLoading,
  color,
  size,
}) => (
  <Fragment>
    {isLoading && (
      <LoadingContainer>
        <LoadingIndicator animating={true} size={size} color={color} />
      </LoadingContainer>
    )}
  </Fragment>
);
