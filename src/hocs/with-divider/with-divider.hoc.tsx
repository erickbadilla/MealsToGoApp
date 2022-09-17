import React, { Fragment, FunctionComponent } from "react";
import { Divider } from "react-native-paper";

export const withDivider =
  <P extends object>(Component: React.ComponentType<P>): FunctionComponent<P> =>
  (props) =>
    (
      <Fragment>
        <Component {...props} />
        <Divider />
      </Fragment>
    );
