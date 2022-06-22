import React from "react";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { RestaurantFoodSelection } from "../../components/restaurant-food-selection/restaurant-food-selection.styles";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";

export const RestaurantDetailScreen = ({ route }) => {
  const { restaurant } = route.params;

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <RestaurantFoodSelection />
    </SafeArea>
  );
};
