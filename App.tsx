import React, { Fragment } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme/index";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurant.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { FavoritesProvider } from "./src/services/favorites/favorites.context";

import { Navigation } from "./src/infrastructure/navigation";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <FavoritesProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavoritesProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </Fragment>
  );
}
