import React, { useState, FunctionComponent, useCallback } from "react";

import { RestaurantList } from "../../components/restaurant-list/restaurant-list.styles";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { Search } from "../../components/search/search.component";
import { useRestaurantContext } from "../../../../services/restaurants/restaurant.context";
import { Colors } from "react-native-paper";
import { Spinner } from "../../../../components/spinner/spinner.component.jsx";
import { FavouriteBar } from "../../../../components/favourites/favourites-bar/favourites-bar.component";
import { useFavoritesContext } from "../../../../services/favorites/favourites.context";
import { RestaurantListItem } from "../../components/restaurant-list-item/restaurant-list-item.component";
import { FadeInView } from "../../../../components/animations/fade.animation";

export const RestaurantsScreen: FunctionComponent = () => {
  const { restaurants, isLoading } = useRestaurantContext();
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { favourites: favorites } = useFavoritesContext();

  const keyExtractor = useCallback(({ name }) => name, []);
  const renderItem = useCallback(
    ({ item }) => (
      <FadeInView duration={800}>
        <RestaurantListItem item={item} />
      </FadeInView>
    ),
    []
  );

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
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeArea>
  );
};
