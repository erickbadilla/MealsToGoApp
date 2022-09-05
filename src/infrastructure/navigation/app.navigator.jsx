import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantNavigator } from "./restaurant.navigator";
import { MapScreen } from "../../features/map/screens/map/map.screen";
import { FavoritesProvider } from "../../services/favorites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurant.context";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON_NAMES = Object.freeze({
  RestaurantsTab: "restaurant-outline",
  MapTab: "map-outline",
  SettingsTab: "settings-outline",
});

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON_NAMES[route.name];

  return {
    tabBarIcon: ({ color, size }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <FavoritesProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen
              name="RestaurantsTab"
              component={RestaurantNavigator}
              options={{ title: "Restaurants" }}
            />
            <Tab.Screen
              name="MapTab"
              component={MapScreen}
              options={{ title: "Map" }}
            />
            <Tab.Screen
              name="SettingsTab"
              component={SettingsNavigator}
              options={{ title: "Settings" }}
            />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesProvider>
  );
};
