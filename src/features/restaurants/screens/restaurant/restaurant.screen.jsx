import React, { useContext, useCallback } from "react";

import { TouchableOpacity } from "react-native";
import { RestaurantList } from "./restaurant.styles.jsx";
import { Spacer } from "../../../../components/spacer/spacer.component.jsx";
import { SafeArea } from "../../../../components/utilities/safe-area.jsx";
import Search from "../../../../components/search/search.component";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";
import { RestaurantContext } from "../../../../services/restaurants/restaurant.context.jsx";
import { Colors } from "react-native-paper";
import { Spinner } from "../../../../components/spinner/spinner.component.jsx";

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantContext);

  const renderRestaurantCallback = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              restaurant: item,
            })
          }
        >
          <Spacer position="bottom" size="large" key={`card-${item.placeId}`}>
            <RestaurantInfoCard restaurant={item} />
          </Spacer>
        </TouchableOpacity>
      );
    },
    [navigation]
  );

  return (
    <SafeArea>
      <Spinner isLoading={isLoading} size={50} color={Colors.blueA100} />
      <Search />

      <RestaurantList
        data={restaurants}
        renderItem={renderRestaurantCallback}
        keyExtractor={({ name }) => name}
      />
    </SafeArea>
  );
};
