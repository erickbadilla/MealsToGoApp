import React, { FunctionComponent } from "react";

import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsScreen } from "../../features/restaurants/screens/restaurant/restaurant.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail/restaurant-detail.screen";
import { Restaurant } from "../../services/models/restaurant";

type RestaurantStackParamList = {
  RestaurantsStack: undefined;
  RestaurantDetailStack: {
    restaurant: Restaurant;
  };
};

export type RestaurantNavigation =
  StackNavigationProp<RestaurantStackParamList>;

const RestaurantStack = createStackNavigator<RestaurantStackParamList>();

export const RestaurantNavigator: FunctionComponent = () => (
  <RestaurantStack.Navigator
    screenOptions={{
      ...TransitionPresets.ModalPresentationIOS,
      headerShown: false,
    }}
  >
    <RestaurantStack.Screen
      name="RestaurantsStack"
      component={RestaurantsScreen}
    />
    <RestaurantStack.Screen
      name="RestaurantDetailStack"
      component={RestaurantDetailScreen}
    />
  </RestaurantStack.Navigator>
);
