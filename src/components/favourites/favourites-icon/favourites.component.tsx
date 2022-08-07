import React, { FunctionComponent, useMemo } from "react";
import { useFavoritesContext } from "../../../services/favorites/favorites.context";
import { FavouriteButton } from "./favourites.styles";
import { AntDesign } from "@expo/vector-icons";
import { Restaurant } from "../../../services/models/restaurant";
interface FavouritesProps {
  restaurant: Restaurant;
}

export const Favourite: FunctionComponent<FavouritesProps> = ({
  restaurant,
}) => {
  const { addFavorite, removeFavorite, favorites } = useFavoritesContext();

  const isFavorite = !!favorites.find(
    ({ placeId }) => placeId === restaurant.placeId
  );

  const handlePress = () => {
    !isFavorite ? addFavorite(restaurant) : removeFavorite(restaurant);
  };

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
