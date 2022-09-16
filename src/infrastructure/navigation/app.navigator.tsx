import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationProp, RouteProp } from "@react-navigation/native";

import { MapScreen } from "../../features/map/screens/map/map.screen";
import { CartContextProvider } from "../../services/cart/cart.context";
import { FavoritesProvider } from "../../services/favorites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurant.context";

import { CheckoutNavigator } from "./checkout.navigator";
import { RestaurantNavigator } from "./restaurant.navigator";
import { SettingsNavigator } from "./settings.navigator";

const TAB_ICON_NAMES = Object.freeze({
  RestaurantsTab: "md-restaurant",
  CheckoutTab: "md-cart",
  MapTab: "md-map",
  SettingsTab: "md-settings",
});

type indexStackParamList = {
  [property in keyof typeof TAB_ICON_NAMES]: undefined;
};

export type TAppNavigation = NavigationProp<indexStackParamList>;

interface ICreateScreenOptions {
  route: RouteProp<indexStackParamList>;
}

const createScreenOptions = ({
  route,
}: ICreateScreenOptions): BottomTabNavigationOptions => {
  const iconName = TAB_ICON_NAMES[route.name];

  return {
    tabBarIcon: ({ color, size }) => (
      //@ts-ignore
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};

const Tab = createBottomTabNavigator<indexStackParamList>();

export const AppNavigator = () => {
  return (
    <FavoritesProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen
                name="RestaurantsTab"
                component={RestaurantNavigator}
                options={{ title: "Restaurants" }}
              />
              <Tab.Screen
                name="CheckoutTab"
                component={CheckoutNavigator}
                options={{ title: "Checkout" }}
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
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesProvider>
  );
};
