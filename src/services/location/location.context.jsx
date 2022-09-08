import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { unstable_batchedUpdates } from "react-native";
import { useIsMounted } from "../../hooks/lifecycle-hooks";
import { locationRequestAPI, locationAPITransform } from "./location.sevice";

const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("San Francisco");
  const isComponentMountedRef = useIsMounted();

  useEffect(() => {
    if (!keyword?.length) {
      return;
    }

    (async () => {
      try {
        const result = await locationRequestAPI(keyword);

        if (!isComponentMountedRef.current) {
          return;
        }

        unstable_batchedUpdates(() => {
          setError(null);
          setLocation(locationAPITransform(result));
        });
      } catch (e) {
        unstable_batchedUpdates(() => {
          setError(e);
          setLocation(null);
        });
      }

      setIsLoading(false);
    })();
  }, [keyword, isComponentMountedRef]);

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

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("Context should be used in LocationContextProvider");
  }

  return context;
};
