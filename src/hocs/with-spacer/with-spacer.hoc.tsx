import React, { FunctionComponent } from "react";

import { Spacer } from "../../components/spacer/spacer.component";

export const withSpacer =
  <P extends object>(
    Component: React.ComponentType<P>
  ): FunctionComponent<P & React.ComponentProps<typeof Spacer>> =>
  ({ position, size, ...props }) =>
    (
      <Spacer position={position} size={size}>
        <Component {...(props as P)} />
      </Spacer>
    );
