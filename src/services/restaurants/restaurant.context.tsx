import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  FunctionComponent,
  useCallback,
} from "react";
import { unstable_batchedUpdates } from "react-native";
import { useIsMounted } from "../../hooks/lifecycle-hooks";
import { useLocation } from "../location/location.context";
import { IRestaurant } from "../models/restaurant";

import {
  restaurantAPITransform,
  RestaurantRequest,
} from "./restaurant.service";

interface IRestaurantContext {
  restaurants: IRestaurant[];
  isLoading: boolean;
  error?: unknown;
}

const RestaurantContext = createContext<IRestaurantContext | undefined>(
  undefined
);

export const RestaurantsContextProvider: FunctionComponent = ({ children }) => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const { location } = useLocation();
  const isComponentMountedRef = useIsMounted();

  const retriveRestaurants = useCallback(
    (restaurantLocation: string) => {
      setIsLoading(true);

      (async () => {
        try {
          const results = await RestaurantRequest(restaurantLocation);

          if (!isComponentMountedRef.current) {
            return;
          }

          unstable_batchedUpdates(() => {
            setError(null);
            setRestaurants(restaurantAPITransform(results));
          });
        } catch (e) {
          unstable_batchedUpdates(() => {
            setError(e);
            setRestaurants([]);
          });
        }

        setIsLoading(false);
      })();
    },
    [isComponentMountedRef]
  );

  useEffect(() => {
    if (!location) {
      return;
    }

    const locationString = `${location.lat},${location.lng}`;
    retriveRestaurants(locationString);
  }, [location, retriveRestaurants]);

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
