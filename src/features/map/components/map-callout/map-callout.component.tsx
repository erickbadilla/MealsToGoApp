import React, { FunctionComponent } from "react";

import { IRestaurant } from "../../../../services/models/restaurant";

import {
  CallOutContainer,
  CalloutImage,
  CalloutText,
} from "./map-callout.styles";

interface IMapCalloutProps {
  restaurant: IRestaurant;
}

export const MapCallout: FunctionComponent<IMapCalloutProps> = ({
  restaurant,
}) => {
  return (
    <CallOutContainer>
      <CalloutImage source={{ uri: restaurant.photos[0] }} />
      <CalloutText>{restaurant.name}</CalloutText>
    </CallOutContainer>
  );
};
