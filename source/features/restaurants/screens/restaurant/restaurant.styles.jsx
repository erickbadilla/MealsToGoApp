import { SafeAreaView, StatusBar, Platform, View } from "react-native";
import styled from "styled-components/native";

const isAndroid = () => Platform.OS === "android";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${isAndroid() ? `${StatusBar.currentHeight}` : "0"}px;
`;

export const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantListContainer = styled(View)`
  flex: 10;
  padding: ${(props) => props.theme.space[3]};
`;
