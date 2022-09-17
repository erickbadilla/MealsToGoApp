import React, { FunctionComponent } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import { CameraScreen } from "../../features/settings/screens/camera/camera.screen";
import { FavouriteScreen } from "../../features/settings/screens/favourites/favourites.screen";
import { SettingsScreen } from "../../features/settings/screens/settings/settings.screen";
import { theme } from "../theme";

type SettingsStackParamList = {
  Settings: undefined;
  Favourites: undefined;
  Camera: undefined;
};

export type SettingsNavigation = StackNavigationProp<SettingsStackParamList>;

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsNavigator: FunctionComponent = () => (
  <Stack.Navigator
    screenOptions={{
      headerMode: "screen",
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.bg.primary },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Favourites" component={FavouriteScreen} />
    <Stack.Screen name="Camera" component={CameraScreen} />
  </Stack.Navigator>
);
