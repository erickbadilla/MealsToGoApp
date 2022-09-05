import React, { createContext, useState, useEffect, useCallback } from "react";
import { locationRequestAPI, locationAPITransform } from "./location.sevice";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("San Francisco");

  useEffect(() => {
    if (!keyword?.length) {
      return;
    }

    (async () => {
      try {
        const result = await locationRequestAPI(keyword);
        setLocation(locationAPITransform(result));
      } catch (e) {
        setError(e);
      }

      setIsLoading(false);
    })();
  }, [keyword]);

  const search = useCallback((searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, isLoading, error, keyword, search }}
    >
      {children}
    </LocationContext.Provider>
  );
};
