import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuthentication } from "../../services/auth/authentication.context";

import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";

export const Navigation: FunctionComponent = () => {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
