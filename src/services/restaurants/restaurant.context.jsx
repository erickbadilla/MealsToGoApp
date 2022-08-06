import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";

import {
  restaurantAPITransform,
  RestaurantRequest,
} from "./restaurant.service";

export const RestaurantContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  useEffect(() => {
    if (!location) {
      return;
    }

    const locationString = `${location.lat},${location.lng}`;
    retriveRestaurants(locationString);
  }, [location]);

  const retriveRestaurants = (restaurantLocation) => {
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
    }, 2000);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
