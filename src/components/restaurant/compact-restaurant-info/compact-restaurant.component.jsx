import React from "react";
import {
  CompactImage,
  CompactWebview,
  Item,
} from "./compact-restaurant.styles";
import { Text } from "../../typography/text.component";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
export const CompactRestaurantInfo = ({ restaurant }) => {
  //This solution is needed because in Android the image loading during mount doesnt resolve as in and IOS Device
  //This may be a common issue with react native and other libraries.
  const Image = isAndroid ? CompactWebview : CompactImage;

  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text>{restaurant.name}</Text>
    </Item>
  );
};
