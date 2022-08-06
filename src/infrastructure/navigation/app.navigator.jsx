import React from "react";

import { Text } from "react-native";
import { SafeArea } from "../../components/utilities/safe-area";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantNavigator } from "./restaurant.navigator";
import { MapScreen } from "../../features/map/screens/map/map.screen";

const Tab = createBottomTabNavigator();

const Settings = () => (
  <SafeArea>
    <Text>Settings Screen</Text>
  </SafeArea>
);

const TAB_ICON_NAMES = {
  RestaurantsTab: "restaurant-outline",
  MapTab: "map-outline",
  SettingsTab: "settings-outline",
};
Object.freeze(TAB_ICON_NAMES);

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
    <NavigationContainer>
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
          component={Settings}
          options={{ title: "Settings" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
