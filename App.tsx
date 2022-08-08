import React, { Fragment, useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  signInWithEmailAndPassword,
} from "firebase/auth/react-native";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";

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
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXLWlH4LW0WjmKcQKSvgK35JJ9KhupDFs",
  authDomain: "mealstogo-12157.firebaseapp.com",
  projectId: "mealstogo-12157",
  storageBucket: "mealstogo-12157.appspot.com",
  messagingSenderId: "92573259742",
  appId: "1:92573259742:web:3c985a93cf4270e03cef4f",
};

//Prevents app from laoding this two or more times while hot reloading
if (getApps().length === 0) {
  const app = initializeApp(firebaseConfig);

  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const Auth = getAuth();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    signInWithEmailAndPassword(Auth, "erickbadilla99@gmail.com", "testApp")
      .then((user) => {
        setIsAuthenticated(true);
      })
      .catch(console.error);
  });

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
