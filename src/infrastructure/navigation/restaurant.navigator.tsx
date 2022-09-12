import React, { FunctionComponent } from "react";

import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsScreen } from "../../features/restaurants/screens/restaurant/restaurant.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail/restaurant-detail.screen";
import { IRestaurant } from "../../services/models/restaurant";
import { RouteProp } from "@react-navigation/native";

type TRestaurantStackParamList = {
  RestaurantsStack: undefined;
  RestaurantDetailStack: {
    restaurant: IRestaurant;
  };
};

export type TRestaurantNavigation =
  StackNavigationProp<TRestaurantStackParamList>;

export type TRestaurantRoute = RouteProp<TRestaurantStackParamList>;

const RestaurantStack = createStackNavigator<TRestaurantStackParamList>();

export const RestaurantNavigator: FunctionComponent = () => (
  <RestaurantStack.Navigator
    screenOptions={{
      ...TransitionPresets.ModalSlideFromBottomIOS,
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
