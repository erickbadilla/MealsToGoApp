import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Restaurant } from "../../../../services/models/restaurant";

export const RestaurantList = styled(
  FlatList as new () => FlatList<Restaurant>
).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
