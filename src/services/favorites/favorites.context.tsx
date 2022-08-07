import React, {
  createContext,
  FC,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { Restaurant } from "../models/restaurant";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IFavoritesContext {
  favorites: Restaurant[];
  addFavorite: (restaurant: Restaurant) => void;
  removeFavorite: (restaurant: Restaurant) => void;
}

const FavoritesContext = createContext<IFavoritesContext | undefined>(
  undefined
);

export const FavoritesProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Restaurant[]>([]);

  const saveFavourites = useCallback(async (restaurant: Restaurant[]) => {
    try {
      const serializedJSON = JSON.stringify(restaurant);
      await AsyncStorage.setItem("@favourites", serializedJSON);
    } catch (e) {
      console.error("Error storing", e);
    }
  }, []);

  const loadFavourites = useCallback(async () => {
    try {
      const serializedJSON = await AsyncStorage.getItem("@favourites");

      if (!serializedJSON) {
        return;
      }

      const storedFavourites: Restaurant[] = JSON.parse(serializedJSON);

      setFavourites(storedFavourites);
    } catch (e) {
      console.error("Error loading", e);
    }
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
    favorites: favourites,
  };

  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);
  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites, saveFavourites]);

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
