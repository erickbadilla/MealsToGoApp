import React, { FunctionComponent } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import { LoginScreen } from "../../features/account/screens/login/login.screen";
import { RegisterScreen } from "../../features/account/screens/register/register.screen";
import { theme } from "../theme";

import { AccountScreen } from "./../../features/account/screens/account/account.screen";

type AccountStackParamList = {
  MainAccountStack: undefined;
  LoginStack: undefined;
  RegisterStack: undefined;
};

export type AccountNavigation = StackNavigationProp<AccountStackParamList>;

const Stack = createStackNavigator<AccountStackParamList>();

export const AccountNavigator: FunctionComponent = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.bg.primary },
    }}
  >
    <Stack.Screen name="MainAccountStack" component={AccountScreen} />
    <Stack.Screen name="LoginStack" component={LoginScreen} />
    <Stack.Screen name="RegisterStack" component={RegisterScreen} />
  </Stack.Navigator>
);
