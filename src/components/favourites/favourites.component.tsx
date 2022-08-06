import React, { FunctionComponent, useCallback, useMemo } from "react";
import { useFavoritesService } from "../../services/favorites/favorites.service";
import { FavouriteButton } from "./favourites.styles";
import { AntDesign } from "@expo/vector-icons";
import { Restaurant } from "../../services/models/restaurant";

interface FavouritesProps {
  restaurant: Restaurant;
}

export const Favourite: FunctionComponent<FavouritesProps> = ({
  restaurant,
}) => {
  const { addFavorite, removeFavorite, favorites } = useFavoritesService();

  const isFavorite = useMemo(() => {
    return !!favorites.find(({ placeId }) => placeId === restaurant.placeId);
  }, [favorites, restaurant]);

  const handlePress = useCallback(() => {
    !isFavorite ? addFavorite(restaurant) : removeFavorite(restaurant);
  }, [addFavorite, removeFavorite]);

  return (
    <FavouriteButton onPress={handlePress}>
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
