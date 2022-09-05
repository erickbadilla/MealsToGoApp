import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  FunctionComponent,
} from "react";
import { Restaurant } from "../models/restaurant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthentication } from "../auth/authentication.context";

interface IFavoritesContext {
  favourites: Restaurant[];
  addFavorite: (restaurant: Restaurant) => void;
  removeFavorite: (restaurant: Restaurant) => void;
}

const FavoritesContext = createContext<IFavoritesContext | undefined>(
  undefined
);

export const FavoritesProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favourites, setFavourites] = useState<Restaurant[]>([]);
  const { user } = useAuthentication();

  const saveFavourites = useCallback(
    async (restaurant: Restaurant[], userUID: string) => {
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

      const storedFavourites: Restaurant[] = JSON.parse(serializedJSON);

      setFavourites(storedFavourites);
    } catch (e) {}
  }, []);

  const addFavorite = useCallback((restaurant: Restaurant) => {
    setFavourites((prev) => [...prev, restaurant]);
  }, []);

  const removeFavorite = useCallback((restaurant: Restaurant) => {
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
