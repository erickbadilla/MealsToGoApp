import { FlatList } from "react-native";
import styled from "styled-components/native";

import { IRestaurant } from "../../../../services/models/restaurant";

export const RestaurantList = styled(
  FlatList as new () => FlatList<IRestaurant>
).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
