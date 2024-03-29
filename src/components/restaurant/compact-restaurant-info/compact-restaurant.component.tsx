import React, { FunctionComponent } from "react";
import { Platform } from "react-native";

import { IRestaurant } from "../../../services/models/restaurant";
import { Text } from "../../typography/text.component";

import {
  CompactImage,
  CompactWebview,
  Item,
} from "./compact-restaurant.styles";

const isAndroid = Platform.OS === "android";

interface CompactRestaurantInfoProps {
  restaurant: IRestaurant;
  isMap?: boolean;
}

export const CompactRestaurantInfo: FunctionComponent<
  CompactRestaurantInfoProps
> = ({ restaurant, isMap = false }) => {
  //This solution is needed because in Android the image loading during mount doesnt resolve as in and IOS Device
  //This may be a common issue with react native and other libraries. This bug just happens with the Map Component Library
  //Thats why we render a CompactWebView with the Maps, if not we just render the normal component of react native Image
  const Image = (
    isAndroid && isMap ? CompactWebview : CompactImage
  ) as React.ElementType;

  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text>{restaurant.name}</Text>
    </Item>
  );
};
