import React, { FunctionComponent } from "react";
import { RouteProp } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import { CheckoutScreen } from "../../features/checkout/screens/checkout/checkout.screen";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error/checkout-error.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success/checkout-success.screen";
import { theme } from "../theme";

type CheckoutStackParamList = {
  Checkout: undefined;
  CheckoutSuccess: undefined;
  CheckoutError: {
    error: string;
  };
};

export type TCheckoutNavigation = StackNavigationProp<CheckoutStackParamList>;

export type TCheckoutRoute = RouteProp<CheckoutStackParamList>;

const Stack = createStackNavigator<CheckoutStackParamList>();

export const CheckoutNavigator: FunctionComponent = () => (
  <Stack.Navigator
    screenOptions={{
      headerMode: "screen",
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.bg.primary },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} />
    <Stack.Screen name="CheckoutError" component={CheckoutErrorScreen} />
  </Stack.Navigator>
);
