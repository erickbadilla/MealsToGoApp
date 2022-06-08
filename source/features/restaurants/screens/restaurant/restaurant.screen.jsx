import React from "react";

import {
  SafeArea,
  SearchContainer,
  RestaurantListContainer,
} from "./restaurant.styles.jsx";

import CustomSearchBar from "../../../../components/custom-search-bar";
import { RestaurantInfo } from "../../components/restaurant-info-card/restaurant-info-card.component";

export const RestaurantsScreen = () => {
  return (
    <SafeArea>
      <SearchContainer>
        <CustomSearchBar />
      </SearchContainer>
      <RestaurantListContainer>
        <RestaurantInfo />
      </RestaurantListContainer>
    </SafeArea>
  );
};
