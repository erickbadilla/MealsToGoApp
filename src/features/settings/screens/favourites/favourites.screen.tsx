import React, { useCallback } from "react";

import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { useFavoritesContext } from "../../../../services/favorites/favourites.context";
import { RestaurantList } from "../../../restaurants/components/restaurant-list/restaurant-list.styles";
import { RestaurantListItem } from "../../../restaurants/components/restaurant-list-item/restaurant-list-item.component";

import { NoFavouritesArea } from "./favourites.styles";

export const FavouriteScreen = () => {
  const { favourites } = useFavoritesContext();

  const keyExtractor = useCallback(({ name }) => name, []);
  const renderItem = useCallback(
    ({ item }) => <RestaurantListItem item={item} />,
    []
  );

  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text>No Favourites yet.</Text>
    </NoFavouritesArea>
  );
};
