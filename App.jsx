import React, { Fragment } from "react";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { RestaurantsScreen } from "./source/features/restaurants/screens/restaurant/restaurant.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./source/infrastructure/theme/index";

export default function App() {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <RestaurantsScreen />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </Fragment>
  );
}
