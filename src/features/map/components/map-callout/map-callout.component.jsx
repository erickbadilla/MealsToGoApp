import React from "react";

import {
  CallOutContainer,
  CalloutImage,
  CalloutText,
} from "./map-callout.styles";

export const MapCallout = ({ restaurant }) => {
  return (
    <CallOutContainer>
      <CalloutImage source={{ uri: restaurant.photos[0] }} />
      <CalloutText>{restaurant.name}</CalloutText>
    </CallOutContainer>
  );
};
