import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthentication } from "../auth/authentication.context";
import { IRestaurant } from "../models/restaurant";

interface IFavoritesContext {
  favourites: IRestaurant[];
  addFavorite: (restaurant: IRestaurant) => void;
  removeFavorite: (restaurant: IRestaurant) => void;
}

const FavoritesContext = createContext<IFavoritesContext | undefined>(
  undefined
);

export const FavoritesProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favourites, setFavourites] = useState<IRestaurant[]>([]);
  const { user } = useAuthentication();

  const saveFavourites = useCallback(
    async (restaurant: IRestaurant[], userUID: string) => {
      try {
        const serializedJSON = JSON.stringify(restaurant);
        await AsyncStorage.setItem(`@favourites-${userUID}`, serializedJSON);
      } catch (e) {}
    },
    []
  );

  const loadFavourites = useCallback(async (userUID: string) => {
    try {
      const serializedJSON = await AsyncStorage.getItem(
        `@favourites-${userUID}`
      );

      if (!serializedJSON) {
        return;
      }

      const storedFavourites: IRestaurant[] = JSON.parse(serializedJSON);

      setFavourites(storedFavourites);
    } catch (e) {}
  }, []);

  const addFavorite = useCallback((restaurant: IRestaurant) => {
    setFavourites((prev) => [...prev, restaurant]);
  }, []);

  const removeFavorite = useCallback((restaurant: IRestaurant) => {
    setFavourites((prevFavorites) =>
      prevFavorites.filter(({ placeId }) => placeId !== restaurant.placeId)
    );
  }, []);

  const favoritesContext: IFavoritesContext = {
    addFavorite,
    removeFavorite,
    favourites,
  };

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [loadFavourites, user]);

  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, saveFavourites, user]);

  return (
    <FavoritesContext.Provider value={favoritesContext}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): IFavoritesContext => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error(
      "useFavoritesService must be used within a FavoritesProvider"
    );
  }
  return context;
};
