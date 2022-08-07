import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  FunctionComponent,
} from "react";
import { LocationContext } from "../location/location.context";
import { Restaurant } from "../models/restaurant";

import {
  restaurantAPITransform,
  RestaurantRequest,
} from "./restaurant.service";

interface IRestaurantContext {
  restaurants: Restaurant[];
  isLoading: boolean;
  error?: unknown;
}

const RestaurantContext = createContext<IRestaurantContext | undefined>(
  undefined
);

export const RestaurantsContextProvider: FunctionComponent = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const { location } = useContext(LocationContext);

  useEffect(() => {
    if (!location) {
      return;
    }

    const locationString = `${location.lat},${location.lng}`;
    retriveRestaurants(locationString);
  }, [location]);

  const retriveRestaurants = (restaurantLocation: string) => {
    setIsLoading(true);
    setRestaurants([]);

    setTimeout(async () => {
      try {
        const result = await RestaurantRequest(restaurantLocation);

        setRestaurants(restaurantAPITransform(result));
      } catch (e) {
        setError(e);
      }

      setIsLoading(false);
    }, 1000);
  };

  const restaurantContext: IRestaurantContext = {
    restaurants,
    isLoading,
    error,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = (): IRestaurantContext => {
  const context = useContext(RestaurantContext);

  if (context === undefined) {
    throw new Error(
      "useRestaurantContext must be used within a RestaurantContext Provider"
    );
  }

  return context;
};
