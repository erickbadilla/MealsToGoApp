import React, { FunctionComponent } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { theme } from "../theme";
import { SettingsScreen } from "../../features/settings/screens/settings/settings.screen";
import { FavouriteScreen } from "../../features/settings/screens/favourites/favourites.screen";
import { CameraScreen } from "../../features/settings/screens/camera/camera.screen";

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
      cardStyle: { backgroundColor: theme.colors.bg.primary },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Favourites" component={FavouriteScreen} />
    <Stack.Screen name="Camera" component={CameraScreen} />
  </Stack.Navigator>
);
