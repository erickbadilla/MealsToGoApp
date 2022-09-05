import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { RestaurantNavigation } from "../../../../infrastructure/navigation/restaurant.navigator";
import { Restaurant } from "../../../../services/models/restaurant";
import { RestaurantInfoCard } from "../restaurant-info-card/restaurant-info-card.component";

export const RestaurantListItem = React.memo<{ item: Restaurant }>(
  ({ item }) => {
    const navigation = useNavigation<RestaurantNavigation>();

    const handlePress = useCallback(
      () =>
        navigation.navigate("RestaurantDetailStack", {
          restaurant: item,
        }),
      [item, navigation]
    );

    return (
      <TouchableOpacity onPress={handlePress}>
        <Spacer position="bottom" size="large" key={`card-${item.placeId}`}>
          <RestaurantInfoCard restaurant={item} />
        </Spacer>
      </TouchableOpacity>
    );
  }
);
