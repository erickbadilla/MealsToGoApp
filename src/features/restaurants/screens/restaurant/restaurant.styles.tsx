import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Restaurant } from "../../../../services/models/restaurant";

export const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantList = styled(
  FlatList as new () => FlatList<Restaurant>
).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
