import React, { createContext, FC, useState, useContext, useMemo } from "react";
import { Restaurant } from "../models/restaurant";

interface IFavoritesService {
  favorites: Restaurant[];
  addFavorite: (restaurant: Restaurant) => void;
  removeFavorite: (restaurant: Restaurant) => void;
}

const FavoritesContext = createContext<IFavoritesService | undefined>(
  undefined
);

export const FavoritesProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  const favoritesService: IFavoritesService = {
    addFavorite: (restaurant: Restaurant) => {
      setFavorites([...favorites, restaurant]);
    },
    removeFavorite: (restaurant: Restaurant) => {
      setFavorites((prevFavorites) =>
        prevFavorites.filter(({ placeId }) => placeId !== restaurant.placeId)
      );
    },
    favorites,
  };

  return (
    <FavoritesContext.Provider value={favoritesService}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesService = (): IFavoritesService => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesService must be used within a FavoritesProvider"
    );
  }
  return context;
};
