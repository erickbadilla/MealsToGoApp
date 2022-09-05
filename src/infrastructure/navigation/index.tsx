import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthentication } from "../../services/auth/authentication.context";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

export const Navigation: FunctionComponent = () => {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
