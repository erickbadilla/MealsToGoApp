import React, { FunctionComponent } from "react";
import { useFavoritesContext } from "../../../services/favorites/favourites.context";
import { FavouriteButton } from "./favourites.styles";
import { AntDesign } from "@expo/vector-icons";
import { IRestaurant } from "../../../services/models/restaurant";
interface FavouritesProps {
  restaurant: IRestaurant;
}

export const Favourite: FunctionComponent<FavouritesProps> = ({
  restaurant,
}) => {
  const {
    addFavorite,
    removeFavorite,
    favourites: favorites,
  } = useFavoritesContext();

  const isFavorite = !!favorites.find(
    ({ placeId }) => placeId === restaurant.placeId
  );

  const handlePress = () => {
    !isFavorite ? addFavorite(restaurant) : removeFavorite(restaurant);
  };

  return (
    <FavouriteButton
      onPress={() => {
        requestAnimationFrame(() => {
          handlePress();
        });
      }}
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
