import React, { useState, FunctionComponent, useCallback } from "react";

import { TouchableOpacity } from "react-native";
import { RestaurantList } from "./restaurant.styles";
import { Spacer } from "../../../../components/spacer/spacer.component.jsx";
import { SafeArea } from "../../../../components/utilities/safe-area.jsx";
import { Search } from "../../components/search/search.component";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";
import { useRestaurantContext } from "../../../../services/restaurants/restaurant.context";
import { Colors } from "react-native-paper";
import { Spinner } from "../../../../components/spinner/spinner.component.jsx";
import { FavouriteBar } from "../../../../components/favourites/favourites-bar/favourites-bar.component";
import { useFavoritesContext } from "../../../../services/favorites/favorites.context";
import { Restaurant } from "../../../../services/models/restaurant";
import { useNavigation } from "@react-navigation/native";
import { RestaurantNavigation } from "../../../../infrastructure/navigation/restaurant.navigator";

export const RestaurantsScreen: FunctionComponent = () => {
  const navigation = useNavigation<RestaurantNavigation>();
  const { restaurants, isLoading } = useRestaurantContext();
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { favorites } = useFavoritesContext();

  const renderRestaurant = useCallback(
    ({ item }: { item: Restaurant }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RestaurantDetailStack", {
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

  const keyExtractor = useCallback(({ name }) => name, []);

  return (
    <SafeArea>
      <Spinner isLoading={isLoading} size={50} color={Colors.blueA100} />
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled((prev) => !prev)}
      />

      {isToggled && <FavouriteBar favourites={favorites} />}

      <RestaurantList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={keyExtractor}
      />
    </SafeArea>
  );
};
