import React, { createContext, useState, useEffect } from "react";
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

    const timeout = setTimeout(async () => {
      try {
        const result = await locationRequestAPI(keyword);
        setLocation(locationAPITransform(result));
      } catch (e) {
        setError(e);
      }

      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [keyword]);

  const search = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  return (
    <LocationContext.Provider
      value={{ location, isLoading, error, keyword, search }}
    >
      {children}
    </LocationContext.Provider>
  );
};
